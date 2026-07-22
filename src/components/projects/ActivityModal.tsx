import { Button, Modal } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { Activity, ActivityDetail, ProjectRegisterJson } from "../../interfaces/Project";
import { activityDetailRequest, projectsCreateRequest, projectsGroupListRequest } from "../../services/project";
import { useEffect, useState } from "react";

interface IProjectNew{
  show: boolean,
//   selectedProject: ProjectJson | null,
//   isNewProject: boolean,
  onClose: () => void,
  refresh: () => void
  selectActivity: Activity | null
}

const ActivityModal: React.FC<IProjectNew> = ({ show, onClose, refresh, selectActivity }) => {

  const InitialActivityDetail: Activity = {
    act_id: undefined,
    act_sea_id: 0,
    act_name: "",
    act_description: "",
    act_date_start: "",
    act_date_end: "",
    act_position: undefined,
  }

  const {
    form,
    setForm,
  } = useForm<Activity>(InitialActivityDetail);



  // useEffect(() => {
  //   if (show) {
  //     handleDetailActivity(idActivity)
  //   //   handleListProjectGroup()
  //   }
  //   // setForm(InitialHabitRegisterJson);
  // }, [idActivity]);

  console.log("form", selectActivity);
  

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
            {selectActivity?.act_name}
          {/* <Form>
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
                {listGroups.map((group:any, index) => (
                  <option key={index} value={group.prg_name}>
                    {group.prg_name}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Form.Group>
            </div>
          </Form> */}
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
          {/* <Button
            variant="warning"
            className="text-white border-0"
            size="sm"
            style={{ backgroundColor: "#f77f00" }}
            onClick={handleRegister}
          >
            Guardar cambios
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActivityModal;
