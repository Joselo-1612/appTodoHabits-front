import { Button, Form } from "react-bootstrap";
import { loginRequest } from "../services/auth";
import { useState } from "react";
import { LoginPageProps } from "../interfaces/Auth";
import { useNavigate } from "react-router-dom";
import {
  BsArrowRight,
  BsCalendar2Check,
  BsEnvelope,
  BsEye,
  BsEyeSlash,
  BsLock,
  BsShieldCheck,
} from "react-icons/bs";
import "../styles/LoginStyle.css";

const LoginPage = () => {

  const navigate = useNavigate();
  const [sesion, setSesion] = useState<LoginPageProps>({
    usu_email: "",
    usu_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await loginRequest(sesion);
      navigate("/habitos");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("No pudimos iniciar sesión. Revisa tu correo y contraseña.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSesion({
      ...sesion,
      [name]: value
    });
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Inicio de sesión">
        <aside className="login-brand-panel">
          <div className="login-brand-mark">
            <BsCalendar2Check />
          </div>

          <div>
            <p className="login-eyebrow">App Todo Habits</p>
            <h1>Organiza tus hábitos y proyectos en un solo lugar.</h1>
            <p className="login-brand-copy">
              Entra a tu espacio personal para revisar avances, pendientes y rutinas del día.
            </p>
          </div>

          <div className="login-brand-stats">
            <div>
              <strong>24</strong>
              <span>hábitos activos</span>
            </div>
            <div>
              <strong>8</strong>
              <span>proyectos</span>
            </div>
          </div>
        </aside>

        <Form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <span>
              <BsShieldCheck />
            </span>
            <div>
              <h2>Iniciar sesión</h2>
              <p>Usa tus credenciales para continuar.</p>
            </div>
          </div>

          {errorMessage && (
            <div className="login-alert" role="alert">
              {errorMessage}
            </div>
          )}

          <Form.Group className="login-field" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <div className="login-input-wrap">
              <BsEnvelope />
              <Form.Control
                type="email"
                placeholder="example@email.com"
                name="usu_email"
                value={sesion.usu_email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="login-field" controlId="formBasicPassword">
            <div className="login-label-row">
              <Form.Label>Contraseña</Form.Label>
              <button type="button">¿Olvidaste tu contraseña?</button>
            </div>
            <div className="login-input-wrap">
              <BsLock />
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                name="usu_password"
                value={sesion.usu_password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                className="login-password-toggle"
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </Form.Group>

          <Button className="login-submit" type="submit" disabled={isLoading}>
            <span>{isLoading ? "Ingresando..." : "Ingresar"}</span>
            <BsArrowRight />
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
