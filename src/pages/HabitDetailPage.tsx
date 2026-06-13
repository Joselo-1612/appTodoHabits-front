import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import Form from "react-bootstrap/esm/Form";
import { HabitDay, HabitJson, ReportDate, ReportHabit } from "../interfaces/Habit";
import { useForm } from "../hooks/useForm";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useParams } from "react-router-dom";
import { habitDetailRequest, reportCountDoneHabit } from "../services/habit";
import { getFirstAndLastDayInMonth, getFormatDateToTime } from "../utils/date";
import { AiOutlineAlignLeft, AiOutlineCarryOut, AiOutlineControl, AiOutlineFieldTime } from "react-icons/ai";
import { BsPencilSquare, BsPlusCircle, BsTrash } from "react-icons/bs";
import { capitalize } from "../utils/util";
import { Badge, Breadcrumb, Button } from "react-bootstrap";
import HabitModal from "../components/habits/HabitModal";
import { useUtil } from "../hooks/useUtil";
import HabitDayModal from "../components/habits/HabitDayModal";

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
  const [habitDay, setHabitDay] = useState<HabitDay | null>(null);
  const [isNewHabit, setIsNewHabit] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const {show, showActive, showInactive} = useUtil();
  const {show: showHabitDay, showActive: showHabitDayActive, showInactive: showHabitDayInactive} = useUtil();


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
    setListHabitsDays(data.data.data.listDaysOfWeek);
  }

  const handleSchudle = (dateIni:string, dateEnd:string) => {

    if (!dateIni && !dateEnd) {
      return "No disponible";
    } else if (dateIni && dateEnd) {
      return `${dateIni} - ${dateEnd}`;
    } else {
      return `${dateIni}`
    }
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
  }, [id, refreshPage]);


  return (
    <LayoutMain>
      <Breadcrumb className="px-1 pt-3">
        <Breadcrumb.Item href="/habitos">
          <span className="text-dark" style={{ color: "#ff6600 !important" }}>
            Habitos
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detalle</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container p-4 my-4 rounded border">
        <HabitModal
          show={show}
          onClose={showInactive}
          refresh={handleRefresh}
          selectedHabit={habitDetail}
          isNewHabit={true}
        />
        <HabitDayModal
          show={showHabitDay}
          onClose={showHabitDayInactive}
          refresh={handleRefresh}
          selectedHabit={habitDay}
          isNewHabit={isNewHabit}
          habitId={Number(id)}
        />
        <section>
          <div className="border-bottom pb-2 mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h4>Habito: {habitDetail?.hab_name}</h4>
                <Badge pill bg="light" text="dark" className="ms-2">
                  <AiOutlineControl />
                  {habitDetail?.hab_type_recurrence}
                </Badge>
                {habitDetail?.hab_is_pinned ? (
                  <div>
                    <span
                      className="badge text-dark ms-2"
                      style={{ backgroundColor: "#f8f5e4" }}
                    >
                      <AiOutlineFieldTime />
                      {getFormatDateToTime(habitDetail?.hab_schedule_ini)} - {getFormatDateToTime(habitDetail?.hab_schedule_end)}
                    </span>
                    <Badge pill bg="light" text="dark" className="ms-2">
                      <AiOutlineCarryOut />&nbsp;
                      {listHabitsDays?.map((day) => day.had_day).join(", ") || 'Todos los dias'}
                    </Badge>
                  </div>                  
                ) : null}
              </div>
              <Button
                size="sm"
                className="d-flex align-items-center gap-1"
                style={{ backgroundColor: "#f77f00", border: "none" }}
                onClick={() => {
                  setIsNewHabit(true);
                  showActive();
                }}
              >
                <BsPlusCircle />
                <span>Editar</span>
              </Button>
            </div>
            <small>{habitDetail?.hab_description}</small>
          </div>
          <div className="row mt-5">
            {!habitDetail?.hab_is_pinned ? (
              <div className="col-md-4 border-end pl-0">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <Button
                    size="sm"
                    className="d-flex align-items-center"
                    style={{ backgroundColor: "#f77f00", border: "none" }}
                    onClick={() => {
                      setIsNewHabit(true);
                      showHabitDayActive();
                    }}
                  >
                    <BsPlusCircle />
                  </Button>
                  <h5 className="mb-0">
                    <b>Actividades:</b>
                  </h5>
                  <br />
                </div>
                <ul>
                  {listHabitsDays?.map((day: HabitDay) => (
                    <li key={day.had_id} className="my-4">
                      {capitalize(day.had_day)}
                      <BsPencilSquare
                        style={{
                          cursor: "pointer",
                          color: "#003049",
                          marginLeft: "12px",
                          marginRight: "4px"
                        }}
                        onClick={() => {
                          setIsNewHabit(true);
                          setHabitDay(day);
                          showHabitDayActive();
                        }}
                      />
                      <BsTrash
                        style={{ cursor: "pointer", color: "#003049"}}
                        onClick={() => {
                          setIsNewHabit(false);
                          setHabitDay(day);
                          showHabitDayActive();
                        }}
                      />
                      <br />
                      <small className="mt-2">
                        <AiOutlineFieldTime />
                        {handleSchudle(day.had_schedule_ini, day.had_schedule_end)}
                      </small>
                      <br />
                      <small className="mt-2">
                        <AiOutlineAlignLeft /> {day.had_description}
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
