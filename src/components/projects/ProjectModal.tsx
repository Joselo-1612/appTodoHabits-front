import { Button, Form, Modal } from "react-bootstrap";
import { days_of_week, type_recurrence } from "../../utils/data";
import { habitDeleteRequest, habitRegisterRequest } from "../../services/habit";
import { HabitJson, HabitRegisterJson } from "../../interfaces/Habit";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { getFormatDateToTime } from "../../utils/date";
import { ProjectRegisterJson } from "../../interfaces/Project";


interface IProjectNew{
  show: boolean,
//   selectedProject: ProjectJson | null,
  isNewProject: boolean,
  onClose: () => void,
  refresh: () => void
}

const ProjectModal: React.FC<IProjectNew> = ({ show, onClose, refresh }) => {

  const InitialHabitRegisterJson: ProjectRegisterJson = {
    pro_name: "",
    pro_description: "",
    pro_priority: 1,
    pro_date_start: "",
    pro_date_end: "",
    pro_prg_id: undefined,
    pro_use_id: 1,
    pro_status: undefined,
    pro_group: undefined
  }

  const {
    form,
    setForm,
    handleChange,
    handleAddMultiCheckbox,
    handleAddOnlyCheckbox,
    handleAddSwitch,
    handleAddDate,
  } = useForm<ProjectRegisterJson>(InitialHabitRegisterJson);

  const handleRegister = async () => {
    await projectRegisterRequest(form);
    await onClose();
    await refresh();
  }

  const handleDeleteHabit = async (idHabit: number) => {
    await habitDeleteRequest(idHabit);
    await onClose();
    await refresh();
  }

  const IsPersonalizedRecurrence = () => {
    return form.hab_type_recurrence === "personalizado";
  }

//   useEffect(() => {
//     if (selectedHabit) {
//       setForm(selectedHabit);
//     } else {
//       setForm(InitialHabitRegisterJson);
//     }
//   }, [selectedHabit]);



  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Nuevo Protecto</Modal.Title>
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
                placeholder="Nombre del proyecto"
                name="pro_name"
                value={form.pro_name}
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
                placeholder="Descripción del Proyecto"
                name="pro_description"
                value={form.pro_description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fs-6 fw-bold d-flex align-items-center justify-content-between">
                <div>
                  <small>Pertenece a</small>
                  <small className="text-danger"> (*)</small>
                </div>
              </Form.Label>
              <Form.Select
                size="sm"
                name="pro_group"
                value={form.pro_group}
                onChange={handleChange}
              >
                <option>Seleccionar grupo</option>
                {type_recurrence.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="row">
            <Form.Group
              className="mt-4 mb-2 col-md-6"
            >
              <Form.Label className="fs-6 fw-bold d-flex align-items-center justify-content-between">
                <div>
                  <small>Fecha Inicial</small>
                  <small className="text-danger"> (*)</small>
                </div>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha Inicial"
                name="pro_date_start"
                defaultValue={getFormatDateToTime(form.pro_date_start)}
                onChange={handleAddDate}
              />
            </Form.Group>
            <Form.Group
              className="mt-4 mb-2 col-md-6"
            >
              <Form.Label className="fs-6 fw-bold d-flex align-items-center justify-content-between">
                <div>
                  <small>Fecha Final</small>
                  <small className="text-danger"> (*)</small>
                </div>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha Final"
                name="pro_date_end"
                defaultValue={getFormatDateToTime(form.pro_date_end)}
                onChange={handleAddDate}
              />
            </Form.Group>
            </div>
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
      </Modal>
    </div>
  );
};

export default ProjectModal;
