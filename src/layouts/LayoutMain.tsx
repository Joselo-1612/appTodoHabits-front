import { ReactNode } from "react";
import { Nav } from "react-bootstrap";
import { BsCalculator, BsFilterLeft } from "react-icons/bs";
import "../index.css"; // estilos personalizados
import { Link } from "react-router-dom";

interface ContainerProps {
    children: ReactNode;
}

const LayoutMain: React.FC<ContainerProps> = ({ children }) => {
    return (
      <>
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
              as={Link}
              to="/habitos"
              className="text-dark d-flex align-items-center gap-1"
            >
              <BsCalculator />
              <small>Habitos</small>
            </Nav.Link>
            <hr />
            <small className="text-secondary mb-3">
              <strong>Mis Proyectos </strong>
            </small>
            <Nav.Link as={Link} to="/proyectos" className="text-dark">
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