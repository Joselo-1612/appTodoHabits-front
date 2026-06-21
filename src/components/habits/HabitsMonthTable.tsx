import { Form } from "react-bootstrap";
import { FaCalendarDays } from "react-icons/fa6";
import Calendar from "react-calendar";
import { formatDateYYYYMMDD, getFirstDayMonth } from "../../utils/date";
import { useState } from "react";

interface Props {
  habits: any[];
  habitsComplete: any;
  habitsCalendar: any[];
  handleDoneSkipped: (habitId: number | undefined, date: string | undefined) => void;
  onUpdateMonth: (month: string) => void;
}

const HabitsMonthTable = ({ habits, habitsComplete, habitsCalendar, handleDoneSkipped, onUpdateMonth }: Props) => {

  const [activeStartDate, setActiveStartDate] = useState(formatDateYYYYMMDD(getFirstDayMonth()));
  const isCurrentMonth = activeStartDate == formatDateYYYYMMDD(getFirstDayMonth());

  const handleCompleteHabits = (dateFormat: string, habit: any) => {
    if (!habitsComplete) {
      return false;
    }

    return Object.entries(habitsComplete).some(
            ([, data]: any) => data.habits.some((h: any) => h.hab_id === habit.hab_id 
            && h.hac_date === dateFormat))
  }

  return (
    <section
      className="container p-4 mb-4 rounded border"
      hidden={habits.length === 0}
    >
      <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="habits-calendar-icon">
            <FaCalendarDays />
          </span>
          <h5 className="p-0 m-0">Calendario</h5>
        </div>
      </div>
      <Calendar
        prevLabel="‹"
        nextLabel={isCurrentMonth ? null : "›"}
        prev2Label={null}
        next2Label={null}
        onActiveStartDateChange={({ activeStartDate, action }) => {
          if (activeStartDate) {
            const dateFormat = formatDateYYYYMMDD(activeStartDate);
            setActiveStartDate(dateFormat);
            onUpdateMonth(dateFormat);
          }
        }}
        value={new Date()}
        view="month"
        className="habits-google-calendar w-100"
        calendarType="gregory"
        showNeighboringMonth
        tileContent={({ date, view }) => {
          const dateFormat = date.toISOString().split("T")[0];
          const habitsOfDay = habitsCalendar?.[dateFormat as any] || [];

          if (view === "month") {
            return (
              <div className="habit-calendar-events">
                {habitsOfDay.map((habit: any) => {
                  const isComplete = handleCompleteHabits(dateFormat, habit);

                  return (
                    <div
                      key={habit.hab_id}
                      className={`habit-calendar-event ${isComplete ? "is-complete" : ""}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Form.Check
                        label={habit.hab_name}
                        type="checkbox"
                        onClick={() => handleDoneSkipped(habit.hab_id, dateFormat)}
                        className="custom-checkbox habit-calendar-check"
                        checked={isComplete}
                        readOnly
                      />
                    </div>
                  );
                })}
              </div>
            );
          }
          return null;
        }}
      />
    </section>
  );
};

export default HabitsMonthTable;
