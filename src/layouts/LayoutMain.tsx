import { ReactNode } from "react";
import { Nav } from "react-bootstrap";
import Calendar from "react-calendar";
import { BsCalculator, BsFilterLeft } from "react-icons/bs";
import "../index.css"; // estilos personalizados

interface ContainerProps {
    children: ReactNode;
}

const LayoutMain: React.FC<ContainerProps> = ({ children }) => {
    return (
      <>
      <div className="container-fluid p-0 h-100">
        <div className="row m-0 h-100">
          <div className="col-12 h-100">
            {/* <Calendar
              // onChange={setDate}
              // value={date}
              view="month"
              className="w-100 h-100 calendar-bootstrap"
            /> */}
          </div>
        </div>
      </div>
      <div className="row min-vh-100 m-0 p-0">
        <Nav
          defaultActiveKey="/home"
          className="flex-column col-12 col-md-2 m-0 p-1"
          style={{ backgroundColor: "#f8f5e4" }}
          hidden={false}
        >
          <small className="text-center my-3">
            <strong>App Todo Habits</strong>
          </small>
          <hr style={{ color: "#003049" }}/>
          <small className="text-secondary mb-3">
            <strong>Control de habitos</strong>
          </small>
          <Nav.Link
            eventKey="/habitos"
            className="text-dark d-flex align-items-center gap-1"
          >
            <BsCalculator />
            <small>Habitos</small>
          </Nav.Link>
          <hr />
          <small className="text-secondary mb-3">
            <strong>Mis Proyectos </strong>
          </small>
          <Nav.Link eventKey="/habitos" className="text-dark">
            <BsFilterLeft />
            <small>Personal</small>
          </Nav.Link>
          <hr />
        </Nav>

        <main className="col-12 col-md-10">{children}</main>
      </div>
      </>
    );
}

export default LayoutMain;