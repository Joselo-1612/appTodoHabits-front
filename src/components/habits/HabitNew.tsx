import { Button, Form, Modal } from "react-bootstrap";
import { type_recurrence } from "../../utils/data";
import { habitRegisterRequest } from "../../services/habit";
import { HabitJson } from "../../interfaces/Habit";
import { useForm } from "../../hooks/useForm";

interface IHabitNew{
    show: boolean,
    onClose: () => void,
    refresh: () => void
}

const HabitNew: React.FC<IHabitNew> = ({ show, onClose, refresh }) => {

    const { form, handleChange } = useForm<HabitJson>({
        hab_name: "",
        hab_description: "",
        hab_type_recurrence: ""
    });

    const handleRegister = async () => {
        await habitRegisterRequest(form);
        await onClose();
        await refresh();
    }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Nuevo Habito</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fs-6 fw-bold">
                <small>Nombre</small> <small className="text-danger">(*)</small>
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={onClose}>
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
      </Modal>
    </div>
  );
};

export default HabitNew;
