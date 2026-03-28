import { Table, ProgressBar, Form } from "react-bootstrap";
import { FaCalendarDays, FaCalendarDay, FaBarsProgress } from "react-icons/fa6";
import { getDateFormat } from "../../utils/date";
// import 'react-calendar/dist/Calendar.css';

interface Props {
  habits: any[];
  habitsComplete: any;
  handleDoneSkipped: (habitId: number | undefined, date: string | undefined) => void;
}

const HabitsWeekTable = ({ habits, habitsComplete, handleDoneSkipped }: Props) => {

  return (
    <section className="container p-4 mb-4 rounded border" hidden={habits.length === 0}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <FaCalendarDays />
        <h5 className="p-0 m-0">Esta semana</h5>
      </div>

      <Table className="table-white" hover>
        <thead>
          <tr>
            <th className="text-dark col-1">
              <FaCalendarDay />
              <small> Fecha</small>
            </th>
            <th className="text-dark col-2">
              <FaBarsProgress />
              <small> Barra de progreso</small>
            </th>

            {habits?.map((habit: any) => (
              <th key={habit.id} className="text-dark text-center col-1">
                {habit.hab_name}
              </th>
            ))}

          </tr>
        </thead>

        <tbody>
          {habitsComplete &&
            Object.entries(habitsComplete).map(([date, data]: any) => (
              <tr key={date}>
                <td className="align-middle">
                  <small>{getDateFormat(date)}</small>
                </td>

                <td className="align-middle">
                  <ProgressBar now={data.percentage} style={{ backgroundColor: "#e9ecef" }}>
                    <ProgressBar
                      now={data.percentage}
                      style={{ backgroundColor: "#f77f00" }}
                      label={`${data.percentage}%`}
                    />
                  </ProgressBar>
                </td>

                {habits?.map((habit: any) => (
                  <td key={habit.hab_id} className="text-center align-middle">
                    <Form.Check
                      inline
                      type="checkbox"
                      onClick={() => handleDoneSkipped(habit.hab_id, date)}
                      className="custom-checkbox"
                      checked={data.habits.some((h: any) => h.hab_id === habit.hab_id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
};

export default HabitsWeekTable;