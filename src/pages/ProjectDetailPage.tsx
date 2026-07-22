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
import { activityRequest, projectDetailRequest, sectionActivityRequest, updateActivitySectionRequest } from "../services/project";
import { useParams } from "react-router-dom";
import { getDayMonth } from "../utils/date";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { Activity, ActivityDetail, ProjectDetail, Section, SectionDetail, Tag } from "../interfaces/Project";
import { DndContext, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import ActivityModal from "../components/projects/ActivityModal";
import { useUtil } from "../hooks/useUtil";

interface CreateActivityDisplay {
  sectionId: number;
  show: boolean;
}

const ProjectDetailPage = () => {

  const { id } = useParams<{ id: string }>();
  const initialSectionActivity = { acs_name: "", acs_pro_id: Number(id) };

  const [project, setProject] = useState<ProjectDetail>();
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const [showCreateSection, setShowCreateSection] = useState<boolean>(false);
  const [showCreateActivity, setShowCreateActivity] = useState<CreateActivityDisplay[]>([]);
  const [activeCard, setActiveCard] = useState<ActivityDetail | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const {show, showActive, showInactive} = useUtil();
  const { form, setForm, handleChange } = useForm<Section>(initialSectionActivity);
  const [refreshModal, setRefreshModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleProjectDetail = async (projectId: string) => {
    const data = await projectDetailRequest(projectId);
    setProject(data.data.data.detail);
    setSections(data.data.data.sections);
  }

  const handleShowCreateSection = () => {
    setShowCreateSection(!showCreateSection);
  }


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

  const ActivityCardContent = ({ card }: { card: ActivityDetail }) => (
    <>
      <div className="project-board-labels">
        {card.tags.map((label: Tag, index) => (
          <span
            className={`project-board-label is-${label.tag_color}`}
            key={index}
          />
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
            <BsChatLeftText />4
          </span>
          {/* )} */}
          {/* {card.attachments && ( */}
          <span>
            <BsPaperclip />2
          </span>
          {/* )} */}
          {/* {card.checklist && ( */}
          <span>
            <BsCheck2Square />3
          </span>
          {/* )} */}
        </div>
      </footer>
    </>
  );

  const ItemActivity = ({ card, sectionId, index }: { card: ActivityDetail, sectionId: number, index: number }) => {

    const activityId = card.act_id || 1;

    const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({
      id: activityId,
      data: { sectionId, index },
    });

    const { setNodeRef: setDropRef, isOver } = useDroppable({
      id: `activity-${activityId}`,
      data: { sectionId, index },
    });

    const setRefs = (node: HTMLElement | null) => {
      setDragRef(node);
      setDropRef(node);
    };

    const style = {
      cursor: "pointer",
      opacity: isDragging ? 0 : 1,
    };

    return (
      <article
        {...listeners}
        {...attributes}
        ref={setRefs}
        key={card.act_id}
        className={`project-board-card${isOver ? " is-over" : ""}`}
        style={style}
        onDoubleClick={() => {
        setSelectedActivity(card);
        showActive();
        }}
      >
        <ActivityCardContent card={card} />
      </article>
    );
  };

  const ListActivities = ({ list, index }: { list: SectionDetail, index: number }) => {
    const sectionId = list.acs_id || index;
    const initialCreateActivity: Activity = { act_sea_id: 1, act_name: "", act_description: "", act_date_start: "2026-07-11", act_date_end: "2026-07-11", act_position: 0 };
    const { form: formActivity, setForm: setFormActivity, handleChange: handleChangeActivity } = useForm<Activity>(initialCreateActivity);

    const handleShowCreateActivity = (id: number, show: boolean) => {
      setShowCreateActivity((prev) => {
        const existsValue = prev.some((item) => item.sectionId === id);

        if (existsValue) {
          return prev.map((item) =>
            item.sectionId === id ? { ...item, show } : item,
          );
        }

        return [...prev, { sectionId: id, show }];
      });
    };

    const handleCreateActvity = async(index:number, seccionId: number|undefined) => {
      try{

        console.log("val-index", index);

        const activity = {
          ...formActivity,
          act_sea_id: seccionId ?? 1
        };

        setFormActivity(activity);

        await activityRequest(activity);

        handleShowCreateActivity(index, false);
        setFormActivity(initialCreateActivity);
        handleRefresh();
      } catch (error: any) {
        // setError(error?.response?.data.message || "Error al registrar la actividad");
        throw error;
      }
    }

    const { setNodeRef } = useDroppable({
      id: `section-${sectionId}`,
      data: { sectionId, index: list.activities?.length || 0 },
    });

    return (
      <article
        className="project-board-list"
        ref={setNodeRef}
        key={list.acs_id}
        >
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
          {list.activities?.map((card: ActivityDetail, cardIndex: number) => (
            <ItemActivity card={card} sectionId={sectionId} index={cardIndex} />
          ))}
        </div>
        {!showCreateActivity.some(
          (item) => item.sectionId === index && item.show,
        ) ? (
          <button
            className="project-board-add-card"
            type="button"
            onClick={() => handleShowCreateActivity(index, true)}
          >
            <BsPlus />
            <span>Añadir una tarjeta</span>
          </button>
        ) : (
          <Form.Group className="project-board-cards mt-2 d-flex align-items-center flex-column">
            <Form.Control
              type="text"
              placeholder="Ingresa actividad"
              name="act_name"
              value={formActivity.act_name}
              onChange={handleChangeActivity}
              style={{ outline: "none" }}
            />
            <div className="d-flex gap-2">
              <Button
                variant="light"
                type="submit"
                size="sm"
                onClick={() => handleCreateActvity(index, list.acs_id)}
              >
                Añadir
              </Button>
              <Button
                variant="primary"
                type="button"
                size="sm"
                onClick={() => handleShowCreateActivity(index, false)}
              >
                Cancelar
              </Button>
            </div>
          </Form.Group>
        )}
      </article>
    );
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const card = sections
      .flatMap((section) => section.activities || [])
      .find((activity: ActivityDetail) => (activity.act_id || 1) === active.id);

    setActiveCard(card || null);
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    setActiveCard(null);

    if (!over) return;

    const activityId = active.id as number;
    const fromSectionId = active.data.current?.sectionId as number;
    const { sectionId: toSectionId, index: toIndex } = over.data.current as { sectionId: number, index: number };

    await handleUpdateActivitySection(toSectionId, activityId, toIndex);

    setSections((prevSections) => {
      const next = prevSections.map((section) => ({
        ...section,
        activities: [...(section.activities || [])],
      }));

      const fromSection = next.find((section) => (section.acs_id) === fromSectionId);
      const toSection = next.find((section) => (section.acs_id) === toSectionId);

      if (!fromSection || !toSection) return prevSections;

      const fromIndex = fromSection.activities.findIndex((activity) => (activity.act_id || 1) === activityId);
      if (fromIndex === -1) return prevSections;

      const [movedActivity] = fromSection.activities.splice(fromIndex, 1);

      let insertAt = toIndex;
      if (fromSection === toSection && fromIndex < insertAt) {
        insertAt -= 1;
      }

      toSection.activities.splice(insertAt, 0, movedActivity);

      return next;
    });
  }

  const handleUpdateActivitySection = async(sectionId:number, activityId: number, toIndex: number) => {
    try{
      await updateActivitySectionRequest(sectionId, activityId, toIndex);
      handleRefresh();
    } catch (error: any) {
      console.log("val-error", error);
      // setError(error?.response?.data.message || "Error al registrar la actividad");
      throw error;
    }
  }

  useEffect(() => {
    if (id) {
      handleProjectDetail(id);
    }
  }, [id, refreshPage]);

  return (
    <LayoutMain>
      <header className="project-board-title pt-1">
        <h1>{project?.pro_name}</h1>
      </header>
      <main className="project-board-page mt-2">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <section className="project-board">
            {sections.map((list: SectionDetail, index: number) => (
              <ListActivities index={list.acs_id || index} list={list} />
            ))}

            <DragOverlay>
              {activeCard && (
                <article className="project-board-card is-dragging">
                  <ActivityCardContent card={activeCard} />
                </article>
              )}
            </DragOverlay>

            {!showCreateSection ? (
              <button
                className="project-board-add-list"
                type="button"
                onClick={handleShowCreateSection}
              >
                <BsPlus />
                <span>Añadir nueva seccion</span>
              </button>
            ) : (
              <Form.Group
                className="project-board-add-list p-3 d-flex align-items-center flex-column"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Ingresa la seccion"
                  name="acs_name"
                  value={form.acs_name}
                  onChange={handleChange}
                  style={{ outline: "none" }}
                />
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="sm"
                    onClick={handleCreateSection}
                  >
                    Añadir
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    size="sm"
                    onClick={handleShowCreateSection}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form.Group>
            )}
          </section>
        </DndContext>
      </main>
      <ActivityModal
        show={show}
        onClose={showInactive}
        refresh={() => setRefreshModal(!refreshModal)}
        selectActivity={selectedActivity}
      />
    </LayoutMain>
  );
};

export default ProjectDetailPage;
