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
import { projectDetailRequest } from "../services/project";
import { useParams } from "react-router-dom";

type CardLabel = "green" | "yellow" | "orange" | "purple" | "blue";

interface BoardCard {
  id: number;
  title: string;
  labels: CardLabel[];
  date?: string;
  comments?: number;
  attachments?: number;
  checklist?: string;
  members: string[];
}

interface BoardList {
  id: number;
  title: string;
  cards: BoardCard[];
}

const boardLists: BoardList[] = [
  {
    id: 1,
    title: "Ideas",
    cards: [
      {
        id: 101,
        title: "Definir el flujo de proyectos personales",
        labels: ["green", "blue"],
        comments: 3,
        attachments: 1,
        members: ["GP", "AM"],
      },
      {
        id: 102,
        title: "Crear estructura inicial de etiquetas",
        labels: ["yellow"],
        date: "28 Jun",
        checklist: "2/5",
        members: ["GP"],
      },
    ],
  },
  {
    id: 2,
    title: "Por hacer",
    cards: [
      {
        id: 201,
        title: "Diseñar modal para nueva actividad",
        labels: ["purple", "orange"],
        date: "30 Jun",
        comments: 5,
        attachments: 2,
        members: ["GP", "LC"],
      },
      {
        id: 202,
        title: "Conectar grupos de proyecto con la API",
        labels: ["blue"],
        checklist: "1/4",
        members: ["AM"],
      },
      {
        id: 203,
        title: "Validar estados: pendiente, activo y cerrado",
        labels: ["green"],
        comments: 1,
        members: ["GP"],
      },
    ],
  },
  {
    id: 3,
    title: "En progreso",
    cards: [
      {
        id: 301,
        title: "Tablero visual estilo Trello",
        labels: ["orange", "green"],
        date: "Hoy",
        comments: 8,
        checklist: "4/6",
        members: ["GP"],
      },
      {
        id: 302,
        title: "Ajustar responsive para columnas kanban",
        labels: ["yellow", "purple"],
        attachments: 1,
        members: ["LC", "GP"],
      },
    ],
  },
  {
    id: 4,
    title: "Hecho",
    cards: [
      {
        id: 401,
        title: "Ruta protegida para proyectos",
        labels: ["green"],
        date: "Ayer",
        checklist: "3/3",
        members: ["GP"],
      },
    ],
  },
];

const ProjectDetailPage = () => {

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState([]);

  const handleProjectDetail = async (projectId: string) => {
    const data = await projectDetailRequest(projectId);
    setProject(data.data);
  }

  useEffect(() => {
    if (id) {
      handleProjectDetail(id);
    }
  }, [id]);

  console.log("data-project", project);

  return (
    <LayoutMain>
      <header className="project-board-title pt-1">
          <h1>Proyecto personal</h1>
      </header>
      <main className="project-board-page mt-2">
        <section className="project-board">
          {boardLists.map((list) => (
            <article className="project-board-list" key={list.id}>
              <header className="project-board-list-header">
                <h2>{list.title}</h2>
                <div>
                  <span>{list.cards.length}</span>
                  <button type="button" aria-label={`Opciones de ${list.title}`}>
                    <BsThreeDots />
                  </button>
                </div>
              </header>

              <div className="project-board-cards">
                {list.cards.map((card) => (
                  <article className="project-board-card" key={card.id}>
                    <div className="project-board-labels">
                      {card.labels.map((label) => (
                        <span className={`project-board-label is-${label}`} key={label} />
                      ))}
                    </div>

                    <h3>{card.title}</h3>

                    <footer className="project-board-card-footer">
                      <div className="project-board-card-meta">
                        {card.date && (
                          <span>
                            <BsCalendar3 />
                            {card.date}
                          </span>
                        )}
                        {card.comments && (
                          <span>
                            <BsChatLeftText />
                            {card.comments}
                          </span>
                        )}
                        {card.attachments && (
                          <span>
                            <BsPaperclip />
                            {card.attachments}
                          </span>
                        )}
                        {card.checklist && (
                          <span>
                            <BsCheck2Square />
                            {card.checklist}
                          </span>
                        )}
                      </div>

                      {/* <div className="project-board-members">
                        {card.members.map((member) => (
                          <span key={`${card.id}-${member}`}>{member}</span>
                        ))}
                      </div> */}
                    </footer>
                  </article>
                ))}
              </div>

              <button className="project-board-add-card" type="button">
                <BsPlus />
                <span>Añadir una tarjeta</span>
              </button>
            </article>
          ))}

          <button className="project-board-add-list" type="button">
            <BsPlus />
            <span>Añadir otra lista</span>
          </button>
        </section>
      </main>
    </LayoutMain>
  );
};

export default ProjectDetailPage;
