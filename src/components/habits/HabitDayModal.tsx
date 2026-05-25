import { Button, Form, Modal } from "react-bootstrap";
import { days_of_week } from "../../utils/data";
import { habitDayDeleteRequest, habitDayRegisterUpdateRequest } from "../../services/habit";
import { HabitDay } from "../../interfaces/Habit";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";


interface IHabitNew{
  show: boolean,
  selectedHabit: HabitDay | null,
  isNewHabit: boolean,
  habitId: number | null,
  onClose: () => void,
  refresh: () => void
}

const HabitDayModal: React.FC<IHabitNew> = ({ show, onClose, refresh, selectedHabit, isNewHabit, habitId }) => {

  const InitialHabitRegisterJson: HabitDay = {
    had_day: "",
    had_description: "",
    had_schedule: "",
    had_hab_id: habitId ?? 0,
    had_is_new: true
  }

  const {
    form,
    setForm,
    handleChange,
    handleAddDate
  } = useForm<HabitDay>(selectedHabit || InitialHabitRegisterJson);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try{
      await habitDayRegisterUpdateRequest(form);
      setForm(InitialHabitRegisterJson);
      setError(null);
      onClose();
      refresh();
    } catch (error: any) {
      setError(error?.response?.data.message || "Error al registrar la actividad");
      throw error;
    }
  }

  const handleDeleteHabit = async (idHabit: number) => {
    await habitDayDeleteRequest(idHabit);
    setForm(InitialHabitRegisterJson);
    onClose();
    refresh();
  }

  useEffect(() => {
    if (selectedHabit) {
      setForm({
        ...selectedHabit,
        had_is_new: false,
      });
    } else {
      setForm(InitialHabitRegisterJson);
    }
  }, [selectedHabit]);

  useEffect(() => {
    setError(null);
  },[show])

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onClose} centered>
        {!isNewHabit ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5">Eliminar Actividad</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>¿Desea eliminar esta actividad del lunes?</div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                style={{ backgroundColor: "#003049" }}
              >
                Cerrar
              </Button>
              <Button
                variant="warning"
                className="text-white border-0"
                size="sm"
                style={{ backgroundColor: "#f77f00" }}
                onClick={() => handleDeleteHabit(selectedHabit?.had_id ?? 0)}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5">Nuevo Actividad</Modal.Title>
            </Modal.Header>
            {error && (
              <div className="alert alert-danger m-0 p-2 rounded-0" role="alert">
                <small>{error}</small>
              </div>
            )}
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="fs-6 fw-bold">
                    <small>Dia</small>
                    <small className="text-danger"> (*)</small>
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    name="had_day"
                    value={form.had_day}
                    onChange={handleChange}
                  >
                    <option>Seleccionar Dia</option>
                    {days_of_week.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="fs-6 fw-bold">
                    <small>Descripción</small>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    size="sm"
                    rows={3}
                    placeholder="Descripción de la actividad"
                    name="had_description"
                    value={form.had_description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="my-3"
                >
                  <Form.Label className="fs-6 fw-bold d-flex align-items-center justify-content-between">
                    <div>
                      <small>Horario</small>
                      <small className="text-danger"> (*)</small>
                    </div>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="time"
                    placeholder="Horario"
                    name="had_schedule"
                    defaultValue={form.had_schedule}
                    onChange={handleAddDate}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                style={{ backgroundColor: "#003049" }}
              >
                Cerrar
              </Button>
              <Button
                variant="warning"
                className="text-white border-0"
                size="sm"
                style={{ backgroundColor: "#f77f00" }}
                onClick={handleRegister}
              >
                Guardar cambios
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default HabitDayModal;
