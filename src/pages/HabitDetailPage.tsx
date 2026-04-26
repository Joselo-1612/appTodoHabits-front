import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import Form from "react-bootstrap/esm/Form";
import { HabitDay, HabitJson, ReportDate, ReportHabit } from "../interfaces/Habit";
import { useForm } from "../hooks/useForm";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useParams } from "react-router-dom";
import { habitDetailRequest, reportCountDoneHabit } from "../services/habit";
import { getFirstAndLastDayInMonth } from "../utils/date";
import { AiOutlineAlignLeft, AiOutlineFieldTime } from "react-icons/ai";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { capitalize } from "../utils/util";
import { Badge } from "react-bootstrap";

const initialReportDate: ReportDate = {
  from: getFirstAndLastDayInMonth().firstDay,
  to: getFirstAndLastDayInMonth().lastDay
}

const HabitDetailPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [refreshPage, setRefreshPage] = useState(false);
  const { form, handleChange } = useForm<ReportDate>(initialReportDate);
  const [reportHabits, setReportHabits] = useState<ReportHabit | null>(null);
  const [habitDetail, setHabitDetail] = useState<HabitJson | null>(null);
  const [listHabitsDays, setListHabitsDays] = useState<HabitDay[] | null>(null);
  const { id } = useParams<{ id: string }>();


  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  const handleReport = async () => {
    const data = await reportCountDoneHabit(form.from, form.to, Number(id));
    setReportHabits(data.data.data);
  }

  const handleDetailHabit = async () => {
    const data = await habitDetailRequest(Number(id));
    setHabitDetail(data.data.data.detailHabit);
    setListHabitsDays(data.data.data.listDaysHabit);
  }

  useEffect(() => {
    if (form.from && form.to && id) {
      handleReport();
    }
  }, [form.from, form.to, id]);

  useEffect(() => {
    if (id) {
      handleDetailHabit();
    }
  }, [id]);

  return (
    <LayoutMain>
      <div className="container p-4 my-4 rounded border">
        <section>
          <div className="border-bottom pb-2 mb-3">
            <div className="d-flex align-items-center">
              <h4>Habito: {habitDetail?.hab_name}</h4>
              <Badge pill bg="light" text="dark" className="ms-2">
                {habitDetail?.hab_type_recurrence}
              </Badge>
              {habitDetail?.hab_is_pinned ? (
                <span
                  className="badge text-dark"
                  style={{ backgroundColor: "#f8f5e4" }}
                >
                  <AiOutlineFieldTime />
                  {habitDetail?.hab_schedule}
                </span>
              ) : null}
            </div>
            <small>{habitDetail?.hab_description}</small>
          </div>
          <div className="row mt-5">
            {!habitDetail?.hab_is_pinned ? (
              <div className="col-md-4 border-end">
                <h5>
                  <b>Actividades:</b>
                </h5>
                <br />
                <ul>
                  {listHabitsDays?.map((day) => (
                    <li key={day.had_id} className="mb-4">
                      {capitalize(day.had_day)}
                      <BsPencilSquare
                        style={{
                          cursor: "pointer",
                          color: "#003049",
                          marginLeft: "8px",
                        }}
                      />
                      <BsTrash
                        style={{ cursor: "pointer", color: "#003049" }}
                      />
                      <br />
                      <small className="mt-2">
                        <AiOutlineAlignLeft /> {day.had_description}
                      </small>
                      <br />
                      <small className="mt-2">
                        <AiOutlineFieldTime />
                        {day.had_schedule ?? "No disponible"}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="col-md-8">
              <h5>
                <b>Estadistica:</b>
              </h5>
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
              {reportHabits?.listHabitsDone ? (
                <BarChart
                  width="100%"
                  height={300}
                  data={reportHabits.listHabitsDone}
                  className="mt-5"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalDone" fill="#f77f00" />
                </BarChart>
              ) : null}
              <div className="mt-4">
                <h6>
                  Actividades totales:{" "}
                  <span className="badge bg-light text-dark">
                    {reportHabits?.totalHabit}
                  </span>
                </h6>
                <h6>
                  Hechas:{" "}
                  <span
                    className="badge text-dark"
                    style={{ backgroundColor: "#f8f5e4" }}
                  >
                    {reportHabits?.totalDone}
                  </span>
                </h6>
                <h6>
                  No hechas:{" "}
                  <span
                    className="badge text-dark"
                    style={{ backgroundColor: "#f8f5e4" }}
                  >
                    {(reportHabits?.totalHabit ?? 0) -
                      (reportHabits?.totalDone ?? 0)}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutMain>
  );
};

export default HabitDetailPage;
