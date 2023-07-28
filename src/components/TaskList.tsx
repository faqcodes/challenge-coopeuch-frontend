
import { useDeleteTaskMutation, useGetTasksQuery } from '../features/tasks/task-api-slice'
import { Task } from '../models/task'

export const TaskList = ({ onEditTask }: {onEditTask: (task: Task) => void}) => {
  const { data: message, isLoading, isFetching, isError } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const onDeleteTask = (id: number) => {
    deleteTask(id);
  };

  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>loding...</div>

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Vigente</th>
            <th></th>
          </tr>
          {
            message?.data.map((task: Task) => (
              <tr key={task.taskId}>
                <td>{task.description}</td>
                <td>{task.createAt.toString()}</td>
                <td>{task.active.toString()}</td>
                <td>
                  <button onClick={() => onEditTask(task)}>Editar</button>
                  <button onClick={() => onDeleteTask(task.taskId)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
