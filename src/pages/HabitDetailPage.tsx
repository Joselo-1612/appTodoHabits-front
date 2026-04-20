import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import { BsPencilSquare } from "react-icons/bs";
import Form from "react-bootstrap/esm/Form";
import { ReportDate } from "../interfaces/Habit";
import { useForm } from "../hooks/useForm";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useParams } from "react-router-dom";
import { reportCountDoneHabit } from "../services/habit";
import { getFirstAndLastDayInMonth } from "../utils/date";

const initialReportDate: ReportDate = {
  from: getFirstAndLastDayInMonth().firstDay,
  to: getFirstAndLastDayInMonth().lastDay
}

const HabitDetailPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [refreshPage, setRefreshPage] = useState(false);
  const { form, handleChange } = useForm<ReportDate>(initialReportDate);
  const [reportHabits, setReportHabits] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();


  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  const handleReport = async () => {
    const data = await reportCountDoneHabit(form.from, form.to, Number(id)); // Replace 1 with the actual habitId
    setReportHabits(data.data.data);
  }

  useEffect(() => {
    if (form.from && form.to && id) {
      handleReport();
    }
  }, [form.from, form.to, id]);

  // useEffect(() => {
  //   // getListHabists();
  //   // getListHabitsComplete();
  // }, [sessionToken, refreshPage]);

  console.log("val-de-reportDate", form);
  console.log("valor-reportHabits", reportHabits);

  return (
    <LayoutMain>
      <div className="container p-4 my-4 rounded border">
        <section>
          <div>
            <h4>Habito: Ir al gym</h4>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <h5>Actividades:</h5>
              <BsPencilSquare style={{ cursor: "pointer", color: "#003049" }} />
            </div>
            <div className="col-md-8">
              <h5>Estadistica:</h5>
              <div className="row">
                <Form.Group className="mt-3 col-md-6">
                  <Form.Label className="fs-6 fw-bold">
                    <small>Desde</small>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Mensual"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-3 col-md-6">
                  <Form.Label className="fs-6 fw-bold">
                    <small>Hasta</small>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Mensual"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
                <BarChart width={800} height={300} data={reportHabits} className="mt-5">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalDone" fill="#f77f00" />
                </BarChart>
              <div className="mt-4">
                <h6>Actividades totales: <span className="badge bg-light text-dark">15</span></h6>
                <h6>Hechas: <span className="badge bg-success text-white">12</span></h6>
                <h6>No hechas: <span className="badge bg-danger text-white">3</span></h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutMain>
  );
};

export default HabitDetailPage;
