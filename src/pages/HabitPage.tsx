import { FaAlignLeft, FaCalendarDay } from "react-icons/fa";
import LayoutMain from "../layouts/LayoutMain";
import { FaBarsProgress, FaCalendarDays, FaFilePen } from "react-icons/fa6";
import { Badge, Button, Form, ProgressBar, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { habitsListRequest } from "../services/habit";
import { BsPencilSquare, BsPlusCircle, BsTrash } from "react-icons/bs";
import { obtenerSemanaActual } from "../utils/dateFormat";
import './../App.css'
import { HabitJson } from "../interfaces/Habit";

const HabitPage = () => {

  const sessionToken = localStorage.getItem("token") ?? "";
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

  return (
    <LayoutMain>
      <section className="container p-4 my-4 rounded border">
        <div className="d-flex align-items-center justify-content-between gap-3 mb-5">
          <div className="d-flex align-items-center gap-3">
            <FaAlignLeft />
            <div className="d-flex align-items-center gap-1">
              <h5 className="p-0 m-0">Mis habitos</h5>
              <Badge pill bg="light" text="dark">
                {habits?.length || 0}
              </Badge>
            </div>
          </div>
          <Button
            size="sm"
            className="d-flex align-items-center gap-1"
            style={{ backgroundColor: "#f77f00", border: "none" }}
          >
            <BsPlusCircle />
            <span>Nuevo</span>
          </Button>
        </div>
        <ul className="row list-unstyled">
          {habits?.map((habit: any) => (
            <li key={habit.id} className="col-12 col-md-3 mb-4">
              <div className="d-flex align-items-center gap-1">
                <BsPencilSquare />
                <BsTrash />
                <span className="fw-2">
                  {habit.hab_name}
                  <Badge pill bg="light" text="dark">
                    <small>{habit.hab_type_recurrence}</small>
                  </Badge>
                </span>
                <br />
              </div>
              <small>{habit.hab_description}</small>
            </li>
          ))}
        </ul>
      </section>
      <section className="container p-4 mb-4 rounded border">
        <div className="d-flex align-items-center gap-3 mb-4">
          <FaCalendarDays />
          <h5 className="p-0 m-0">Esta semana</h5>
        </div>
        <Table className="table-white" hover>
          <thead>
            <tr>
              <th className="text-dark col-2">
                <FaCalendarDay />
                <small> Fecha</small>
              </th>
              <th className="text-dark col-2">
                <FaBarsProgress />
                <small> Barra de progreso</small>
              </th>
              {habits?.map((habit: any) => (
                <th key={habit.id} className="text-dark text-center col-1">
                  {habit.hab_name}
                </th>
              ))}
              <th className="text-dark text-center col-2">
                <FaFilePen />
                <small> Nota</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {obtenerSemanaActual().map((fecha, index) => (
              <tr>
                <td key={index} className="align-middle">
                  <small>{fecha}</small>
                </td>
                <td className="align-middle">
                  <ProgressBar
                    now={100}
                    label="100%"
                    style={{ backgroundColor: "#e9ecef" }}
                  >
                    <ProgressBar
                      now={100}
                      style={{ backgroundColor: "#f77f00" }}
                      label="100%"
                    />
                  </ProgressBar>
                </td>
              {habits?.map((habit: HabitJson) => (
                <td className="text-center align-middle">
                  <Form.Check
                    inline
                    name="group1"
                    type={"checkbox"}
                    id={`${habit.hab_name}-${index}`}
                    className="custom-checkbox"
                  />
                </td>
              ))}

                <td>
                  <Form.Control as="textarea" rows={1} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </LayoutMain>
  );
};

export default HabitPage;
