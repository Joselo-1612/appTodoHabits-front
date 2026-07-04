import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import Form from "react-bootstrap/esm/Form";
import { HabitDay, HabitJson, ReportDate, ReportHabit } from "../interfaces/Habit";
import { useForm } from "../hooks/useForm";
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from "recharts";
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

const ProjectDetailPage = () => {

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
        <h1>Hola mundo</h1>
    </LayoutMain>
  );
};

export default ProjectDetailPage;
