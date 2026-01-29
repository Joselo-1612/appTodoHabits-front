import { Button, Form } from "react-bootstrap";
import LayoutMain from "../layouts/LayoutMain";
import { loginRequest } from "../services/auth";
import { useState } from "react";
import { LoginPageProps } from "../interfaces/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const [sesion, setSesion] = useState<LoginPageProps>({
    usu_email: "",
    usu_password: ""
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginRequest(sesion);
    navigate("/habits");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSesion({
      ...sesion,
      [name]: value
    });
  }

  return (
    <LayoutMain titlePage="login">
      <Form
        className="border p-4 rounded bg-light shadow-sm"
        style={{ maxWidth: "400px", margin: "auto" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-5">Iniciar Sesión</h3>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Ingresar email"
            name="usu_email"
            value={sesion.usu_email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="usu_password"
            value={sesion.usu_password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Ingresar
        </Button>
      </Form>
    </LayoutMain>
  );
};

export default LoginPage;
