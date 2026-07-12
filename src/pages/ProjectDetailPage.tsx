import { useEffect, useState } from "react";
import LayoutMain from "../layouts/LayoutMain";
import './../App.css'
import 'react-calendar/dist/Calendar.css';
import {
  BsCalendar3,
  BsChatLeftText,
  BsCheck2Square,
  BsPaperclip,
  BsPlus,
  BsThreeDots,
} from "react-icons/bs";
import { activityRequest, projectDetailRequest, sectionActivityRequest } from "../services/project";
import { useParams } from "react-router-dom";
import { getDayMonth } from "../utils/date";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { Activity, ActivityDetail, ProjectDetail, Section, SectionDetail, Tag } from "../interfaces/Project";

interface CreateActivityDisplay {
  sectionId: number;
  show: boolean;
}

/*
  act_id: number,
  act_sea_id: number,
  act_name: string,
  act_description: string,
  act_date_start: string,
  act_date_end: string
*/

const ProjectDetailPage = () => {

  const { id } = useParams<{ id: string }>();
  const initialSectionActivity = { acs_name: "", acs_pro_id: Number(id) };
  const initialCreateActivity: Activity = { act_sea_id: 1, act_name: "", act_description: "", act_date_start: "2026-07-11", act_date_end: "2026-07-11" };

  const [project, setProject] = useState<ProjectDetail>();
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const [showCreateSection, setShowCreateSection] = useState<boolean>(false);
  const [showCreateActivity, setShowCreateActivity] = useState<CreateActivityDisplay[]>([]);

  const { form, setForm, handleChange } = useForm<Section>(initialSectionActivity);
  const { form: formActivity, setForm: setFormActivity, handleChange: handleChangeActivity } = useForm<Activity>(initialCreateActivity);
  const [refreshPage, setRefreshPage] = useState(false);

  const handleProjectDetail = async (projectId: string) => {
    const data = await projectDetailRequest(projectId);
    setProject(data.data.data.detail);
    setSections(data.data.data.sections);
  }

  const handleShowCreateSection = () => {
    setShowCreateSection(!showCreateSection);
  }

  const handleShowCreateActivity = (id: number, show: boolean) => {
    setShowCreateActivity(prev => {
      const existsValue = prev.some(item => item.sectionId === id);

      if (existsValue) {
        return prev.map(item =>
          item.sectionId === id ? { ...item, show } : item
        );
      }

      return [...prev, { sectionId: id, show }];
    });
  };

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  }

  const handleCreateSection = async() => {
    try{
      await sectionActivityRequest(form);
      setShowCreateSection(false);
      setForm(initialSectionActivity);
      handleRefresh()
    } catch (error: any) {
      // setError(error?.response?.data.message || "Error al registrar la actividad");
      throw error;
    }
  }

  const handleCreateActvity = async(index:number) => {
    try{
      await activityRequest(formActivity);
      handleShowCreateActivity(index, false);
      setFormActivity(initialCreateActivity);
      handleRefresh()
    } catch (error: any) {
      // setError(error?.response?.data.message || "Error al registrar la actividad");
      throw error;
    }
  }

  useEffect(() => {
    if (id) {
      handleProjectDetail(id);
    }
  }, [id, refreshPage]);

  console.log("val-showCreateActivity", showCreateActivity);

  return (
    <LayoutMain>
      <header className="project-board-title pt-1">
          <h1>{project?.pro_name}</h1>
      </header>
      <main className="project-board-page mt-2">
        <section className="project-board">
          {sections.map((list:SectionDetail, index: number) => (
            <article className="project-board-list" key={list.acs_id}>
              <header className="project-board-list-header">
                <h2>{list.acs_name}</h2>
                <div>
                  <span>{list.activities?.length || 0}</span>
                  <button type="button" aria-label={`Opciones de ${list.acs_name}`}>
                    <BsThreeDots />
                  </button>
                </div>
              </header>

              <div className="project-board-cards">
                {list.activities?.map((card:ActivityDetail) => (
                  <article className="project-board-card" key={card.act_id}>
                    <div className="project-board-labels">
                      {card.tags.map((label: Tag, index) => (
                        <span className={`project-board-label is-${label.tag_color}`} key={index} />
                      ))}
                    </div>

                    <h3>{card.act_name}</h3>

                    <footer className="project-board-card-footer">
                      <div className="project-board-card-meta">
                        {card.act_date_start && (
                          <span>
                            <BsCalendar3 />
                            Inicio: {getDayMonth(card.act_date_start)}.
                          </span>
                        )}
                        {/* {card.comments && ( */}
                          <span>
                            <BsChatLeftText />
                            4
                          </span>
                        {/* )} */}
                        {/* {card.attachments && ( */}
                          <span>
                            <BsPaperclip />
                            2
                          </span>
                        {/* )} */}
                        {/* {card.checklist && ( */}
                          <span>
                            <BsCheck2Square />
                            3
                          </span>
                        {/* )} */}
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
              {!showCreateActivity.some((item) => item.sectionId === index && item.show) ? (
                <button className="project-board-add-card" type="button" onClick={() => handleShowCreateActivity(index, true)}>
                  <BsPlus />
                  <span>Añadir una tarjeta</span>
                </button>
              ): (
              <Form.Group className="project-board-cards mt-2 d-flex align-items-center flex-column">
                <Form.Control type="text" placeholder="Ingresa la seccion" name="act_name" value={formActivity.act_name} onChange={handleChangeActivity} style={{ outline: "none"}} />
                <div className="d-flex gap-2">
                  <Button variant="light" type="submit" size="sm" onClick={() => handleCreateActvity(index)}>
                    Añadir
                  </Button>
                  <Button variant="primary" type="button" size="sm" onClick={() => handleShowCreateActivity(index, false)}>
                    Cancelar
                  </Button>
                </div>
              </Form.Group>
              )}
            </article>
          ))}

          {
            !showCreateSection ? (
              <button
                className="project-board-add-list"
                type="button"
                onClick={handleShowCreateSection}>
                  <BsPlus />
                  <span>Añadir nueva seccion</span>
              </button>
            ) : (
              <Form.Group className="project-board-add-list p-3 d-flex align-items-center flex-column" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Ingresa la seccion" name="acs_name" value={form.acs_name} onChange={handleChange} style={{ outline: "none"}} />
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" size="sm" onClick={handleCreateSection}>
                    Añadir
                  </Button>
                  <Button variant="primary" type="button" size="sm" onClick={handleShowCreateSection}>
                    Cancelar
                  </Button>
                </div>
              </Form.Group>
            )
          }

        </section>
      </main>
    </LayoutMain>
  );
};

export default ProjectDetailPage;
