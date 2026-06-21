import LayoutMain from "../layouts/LayoutMain";
import { useEffect, useState } from "react";
import './../App.css'
import 'react-calendar/dist/Calendar.css';

const HabitPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
  const [refreshPage, setRefreshPage] = useState(false);

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  useEffect(() => {

  }, [sessionToken, refreshPage]);

  return (
    <LayoutMain>
        <h1>Hola mundo</h1>
    </LayoutMain>
  );
};

export default HabitPage;
