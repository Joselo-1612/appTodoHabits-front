import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import { BsPencilSquare } from "react-icons/bs";
import Form from "react-bootstrap/esm/Form";
import { ReportDate } from "../interfaces/Habit";
import { useForm } from "../hooks/useForm";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, TooltipContentProps, XAxis, YAxis } from "recharts";

const initialReportDate: ReportDate = {
  from: "",
  to: ""
}

const HabitDetailPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [refreshPage, setRefreshPage] = useState(false);
  const { form, handleChange } = useForm<ReportDate>(initialReportDate);


  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  useEffect(() => {
    // getListHabists();
    // getListHabitsComplete();
  }, [sessionToken, refreshPage]);

  console.log("val-de-reportDate", form);

    const data = [
    { name: "Ene", ventas: 400 },
    { name: "Feb", ventas: 300 },
    { name: "Mar", ventas: 500 },
    { name: "Abr", ventas: 200 },
    { name: "May", ventas: 200 }
    ];

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
              <BarChart width={800} height={300} data={data} className="mt-5">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#f77f00" />
              </BarChart>
            </div>
          </div>
        </section>
      </div>
    </LayoutMain>
  );
};

export default HabitDetailPage;
