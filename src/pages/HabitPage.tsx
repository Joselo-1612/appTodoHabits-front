import LayoutMain from "../layouts/LayoutMain";
import { useEffect, useState } from "react";
import { habitsCompleteDoneSkippedRequest, habitsCompleteListRequest, habitsListRequest } from "../services/habit";
import './../App.css'
import HabitsList from "../components/habits/HabitsList";
import HabitsWeekTable from "../components/habits/HabitsWeekTable";

const HabitPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [habits, setHabits] = useState<any[]>();
  const [habitsComplete, setHabitsComplete] = useState<any[]>();
  const [refreshPage, setRefreshPage] = useState(false);

  const getListHabists = async () => {
    try {
      const response = await habitsListRequest();
      console.log("response de habitsListRequest", response);
      setHabits(response.data.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }

  const getListHabitsComplete = async () => {
    try {
      const response = await habitsCompleteListRequest();
      console.log("response de habitsCompleteListRequest", response);
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
        setRefreshPage(!refreshPage);
      }
    } catch (error) {
      console.error("Error fetching habits complete:", error);
    }
  }

  useEffect(() => {
    getListHabists();
    getListHabitsComplete();
  }, [sessionToken, refreshPage]);

  return (
    <LayoutMain>
      <HabitsList habits={habits || []} />
      <HabitsWeekTable
        habits={habits || []}
        habitsComplete={habitsComplete}
        handleDoneSkipped={handleDoneSkipped}
      />
    </LayoutMain>
  );
};

export default HabitPage;
