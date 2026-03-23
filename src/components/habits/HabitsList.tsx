import { FaAlignLeft } from "react-icons/fa";
import { Badge, Button } from "react-bootstrap";
import { BsPencilSquare, BsPlusCircle, BsTrash } from "react-icons/bs";
import { HabitJson } from "../../interfaces/Habit";
import HabitNew from "./HabitNew";
import { useUtil } from "../../hooks/useUtil";
import { useState } from "react";

interface HabitsListProps {
  habits: HabitJson[];
  refresh: () => void;
}

const HabitsList: React.FC<HabitsListProps> = ({ habits, refresh }) => {

  const {show, showActive, showInactive} = useUtil();
  const [isNewHabit, setIsNewHabit] = useState<boolean>(true);
  const [selectedHabit, setSelectedHabit] = useState<HabitJson | null>(null);

  const handleDeleteHabit = (habit: HabitJson) => {
    setSelectedHabit(habit);
    setIsNewHabit(false);
    showActive();
  }

  return (
    <section className="container p-4 my-4 rounded border">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-5">
        <div className="d-flex align-items-center gap-3">
          <FaAlignLeft />
          <div className="d-flex align-items-center gap-1">
            <h5 className="p-0 m-0">Mis habitos</h5>
            <Badge pill bg="light" text="dark">
              {habits?.length || 0}
            </Badge>
          </div>
        </div>
        <Button
          size="sm"
          className="d-flex align-items-center gap-1"
          style={{ backgroundColor: "#f77f00", border: "none" }}
          onClick={() => {
            setIsNewHabit(true);
            showActive();
          }}
        >
          <BsPlusCircle />
          <span>Nuevo</span>
        </Button>
      </div>
      <HabitNew
        show={show}
        onClose={showInactive}
        refresh={refresh}
        selectedHabit={selectedHabit ?? null}
        isNewHabit={isNewHabit}
      />
      <ul className="row list-unstyled">
        {habits?.map((habit: any) => (
          <li key={habit.id} className="col-12 col-md-3 mb-4">
            <div className="d-flex align-items-center gap-1">
              <BsPencilSquare />
              <BsTrash onClick={() => handleDeleteHabit(habit)}/>
              <span className="fw-2">
                {habit.hab_name}
                <Badge pill bg="light" text="dark">
                  <small>{habit.hab_type_recurrence}</small>
                </Badge>
              </span>
              <br />
            </div>
            <small>{habit.hab_description}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HabitsList;
