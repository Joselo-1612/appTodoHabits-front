import { FaAlignLeft, FaCalendarDay } from "react-icons/fa";
import LayoutMain from "../layouts/LayoutMain";
import { FaBarsProgress, FaCalendarDays, FaFilePen } from "react-icons/fa6";
import { Form, ProgressBar, Table } from "react-bootstrap";
import { useSession } from "../hooks/useSession";
import { useEffect, useState } from "react";
import { habitsListRequest } from "../services/habit";

const HabitPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";

  console.log("valor de sessionToken", [sessionToken]);

  const [habits, setHabits] = useState<any[]>();

  const getListHabists = async () => {
    try {
      const response = await habitsListRequest();
      console.log("response de habitsListRequest", response);
      setHabits(response.data.data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }


  useEffect(() => {
    getListHabists();
    // if (!sessionToken) {
    //   window.location.href = "/login"; // Redirigir a la página de inicio de sesión si no hay token
    // }
  }, [sessionToken]);

  console.log("valor de habits", habits);
  

  return (
    <LayoutMain titlePage="login">
      <section className="bg-info text-center text-white p-5 mb-4">
        <h1>
          <b>Habitos</b>
        </h1>
      </section>
      <section className="container bg-light p-5 mb-4 rounded border">
        <div className="d-flex align-items-center gap-3 mb-5">
          <FaAlignLeft />
          <h4 className="p-0 m-0">Mis habitos</h4>
        </div>
        <ul>
          {
            habits?.map((habit: any) => (
              <li key={habit.id}>
                {habit.hab_name} ({habit.hab_description})
              </li>
            ))
          }
          {/* <li>Hacer ejercicio</li>
          <li>Dormir antes de las 11</li>
          <li>Avanzar proyecto</li> */}
        </ul>
      </section>
      <section className="container bg-light p-5 mb-4 rounded border">
        <div className="d-flex align-items-center gap-3 mb-4">
          <FaCalendarDays />
          <h4 className="p-0 m-0">Esta semana</h4>
        </div>
        <Table className="table-light" hover>
          <thead>
            <tr>
              <th className="text-secondary col-2">
                <FaCalendarDay />
                <small> Fecha</small>
              </th>
              <th className="text-secondary col-2">
                <FaBarsProgress />
                <small> Barra de progreso</small>
              </th>
              <th className="col-1">💪</th>
              <th className="col-1">💪</th>
              <th className="text-secondary col-2">
                <FaFilePen />
                <small> Nota</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January 25, 2026</td>
              <td>
                <ProgressBar variant="danger" now={60} label={`${60}%`} />
              </td>
              <td>
                <Form.Check
                  inline
                  name="group1"
                  type={"checkbox"}
                  id={`inline-1`}
                />
              </td>
              <td>@mdo</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </LayoutMain>
  );
};

export default HabitPage;
