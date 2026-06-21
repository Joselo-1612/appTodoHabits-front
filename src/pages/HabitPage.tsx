import LayoutMain from "../layouts/LayoutMain";
import { useEffect, useState } from "react";
import { habitsCompleteDoneSkippedRequest, habitsCompleteListRequest, habitsListCalendarRequest, habitsListRequest } from "../services/habit";
import './../App.css'
import HabitsList from "../components/habits/HabitsList";
import HabitsMonthTable from "../components/habits/HabitsMonthTable";
import 'react-calendar/dist/Calendar.css';
import { formatDateYYYYMMDD } from "../utils/date";

const HabitPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [habits, setHabits] = useState<any[]>();
  const [habitsComplete, setHabitsComplete] = useState<any[]>();
  const [habitsCalendar, setHabitsCalendar] = useState<any[]>();
  const [currentMonth, setCurrentMonth] = useState<string>(formatDateYYYYMMDD(new Date()));
  const [refreshPage, setRefreshPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getListHabists = async () => {
    try {
      const response = await habitsListRequest();
      setHabits(response.data.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  const getListCalendarHabists = async () => {
    try {
      const response = await habitsListCalendarRequest(currentMonth);
      setHabitsCalendar(response.data.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  const getListHabitsComplete = async () => {
    try {
      const response = await habitsCompleteListRequest(currentMonth);
      setHabitsComplete(response.data.data);
    } catch (error) {
      console.error("Error fetching habits complete:", error);
    }
  }

  const handleDoneSkipped = async (habitId: number | undefined, date: string | undefined) => {
    try {
      if (habitId && date) {
        const response = await habitsCompleteDoneSkippedRequest(habitId, date);
        console.log("response de habitsCompleteDoneSkippedRequest", response);
        setError(null);
        setRefreshPage(!refreshPage);
      }
    } catch (error:any) {

      setError(error?.response?.data.message || "Error al registrar la actividad");
      throw error;
    }
  }

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  const handleUpdateMonth = (month: string) => {
    setCurrentMonth(month);
  }

  useEffect(() => {
    getListHabists();
    getListHabitsComplete();
    getListCalendarHabists();
  }, [sessionToken, refreshPage]);

  useEffect(() => {
    getListHabitsComplete();
    getListCalendarHabists();
  }, [currentMonth]);

  return (
    <LayoutMain>
      <HabitsList habits={habits || []} refresh={handleRefresh} />
      {error && (
        <div
          className="alert alert-danger fw-bold"
          style={{ fontSize: "14px" }}
        >
          {error}
        </div>
      )}
      <HabitsMonthTable
        habits={habits || []}
        habitsCalendar={habitsCalendar || []}
        habitsComplete={habitsComplete}
        handleDoneSkipped={handleDoneSkipped}
        onUpdateMonth={handleUpdateMonth}
      />
    </LayoutMain>
  );
};

export default HabitPage;
