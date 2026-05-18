import { Button, Form, Modal } from "react-bootstrap";
import { days_of_week, type_recurrence } from "../../utils/data";
import { habitDeleteRequest, habitRegisterRequest } from "../../services/habit";
import { HabitDay } from "../../interfaces/Habit";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";


interface IHabitNew{
  show: boolean,
  selectedHabit: HabitDay | null,
  isNewHabit: boolean,
  onClose: () => void,
  refresh: () => void
}

const HabitDayModal: React.FC<IHabitNew> = ({ show, onClose, refresh, selectedHabit, isNewHabit }) => {

  const InitialHabitRegisterJson: HabitDay = {
    had_day: "",
    had_description: "",
    had_schedule: ""
  }

  const {
    form,
    setForm,
    handleChange,
    handleAddMultiCheckbox,
    handleAddOnlyCheckbox,
    handleAddSwitch,
    handleAddDate,
  } = useForm<HabitDay>(selectedHabit || InitialHabitRegisterJson);

  // const handleRegister = async () => {
  //   await habitRegisterRequest(form);
  //   await onClose();
  //   await refresh();
  // }

  const handleDeleteHabit = async (idHabit: number) => {
    await habitDeleteRequest(idHabit);
    await onClose();
    await refresh();
  }

  // const IsPersonalizedRecurrence = () => {
  //   return form.hab_type_recurrence === "personalizado";
  // }

  useEffect(() => {
    if (selectedHabit) {
      setForm(selectedHabit);
    } else {
      setForm(InitialHabitRegisterJson);
    }
  }, [selectedHabit]);

  // useEffect(() => {
  //   if (form.hab_type_recurrence == "semanal" || form.hab_type_recurrence == "mensual") {
  //     setForm({
  //       ...form,
  //       hab_is_pinned: 1
  //     });
  //   }
  // }, [form.hab_type_recurrence])


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
                // onClick={() => handleDeleteHabit(selectedHabit?.hab_id ?? 0)}
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
                    name="hab_type_recurrence"
                    // value={form.hab_type_recurrence}
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
                    name="hab_description"
                    // value={form.hab_description}
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
                    name="hab_schedule"
                    // value={form.hab_schedule}
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
                // onClick={handleRegister}
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
