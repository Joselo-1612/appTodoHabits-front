import { Button, Form, Modal } from "react-bootstrap";
import { days_of_week, type_recurrence } from "../../utils/data";
import { habitDeleteRequest, habitRegisterRequest } from "../../services/habit";
import { HabitJson, HabitRegisterJson } from "../../interfaces/Habit";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

interface IHabitNew{
  show: boolean,
  selectedHabit: HabitJson | null,
  isNewHabit: boolean,
  onClose: () => void,
  refresh: () => void
}

const HabitNew: React.FC<IHabitNew> = ({ show, onClose, refresh, selectedHabit, isNewHabit }) => {

  const InitialHabitRegisterJson = {
    hab_name: "",
    hab_description: "",
    hab_type_recurrence: "",
    hab_days_of_week: []
  }

  const { form, setForm, handleChange, handleAddDaysCheckbox } = useForm<HabitRegisterJson>(InitialHabitRegisterJson);

  const handleRegister = async () => {
    await habitRegisterRequest(form);
    await onClose();
    await refresh();
  }

  const handleDeleteHabit = async (idHabit: number) => {
    await habitDeleteRequest(idHabit);
    await onClose();
    await refresh();
  }

  useEffect(() => {
    setForm(InitialHabitRegisterJson);
  }, [onClose]);


  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onClose} centered>
        {!isNewHabit && selectedHabit?.hab_id ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5">Eliminar Habito</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>
                ¿Desea eliminar este hábito "{selectedHabit?.hab_name}"?
              </div>
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
                onClick={() => handleDeleteHabit(selectedHabit?.hab_id ?? 0)}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fs-5">Nuevo Habito</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="fs-6 fw-bold">
                    <small>Nombre</small>
                    <small className="text-danger"> (*)</small>
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Nombre del habito"
                    name="hab_name"
                    value={form.hab_name}
                    onChange={handleChange}
                  />
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
                    placeholder="Descripción del habito"
                    name="hab_description"
                    value={form.hab_description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="fs-6 fw-bold">
                    <small>Recurrencia</small>
                    <small className="text-danger"> (*)</small>
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    name="hab_type_recurrence"
                    value={form.hab_type_recurrence}
                    onChange={handleChange}
                  >
                    <option>Seleccionar recurrencia</option>
                    {type_recurrence.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mt-3"
                  hidden={form.hab_type_recurrence !== "personalizado"}
                >
                  <Form.Label className="fs-6 fw-bold">
                    <small>Elige los días de la semana</small>
                    <small className="text-danger"> (*)</small>
                  </Form.Label>
                  <div className="d-flex align-items-center rounded">
                    {days_of_week.map((type) => (
                      <Form.Check
                        className="mx-2 mt-1"
                        style={{ fontSize: "15px" }}
                        label={type.substring(0, 3)}
                        type="checkbox"
                        value={type}
                        name="hab_days_of_week"
                        onChange={handleAddDaysCheckbox}
                        id={`inline-${type}`}
                      />
                    ))}
                  </div>
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

export default HabitNew;
