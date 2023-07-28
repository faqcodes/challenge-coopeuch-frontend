
import { useGetTasksQuery } from '../features/tasks/task-api-slice'
import { Task } from '../models/task'

export const TaskList = () => {
  const { data, isLoading, isFetching, isError } = useGetTasksQuery();

  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>loding...</div>

  return (
    <div className={isFetching ? 'tasks--disabled' : ''}>
      <table>
        <tbody>
          <tr>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Vigente</th>
            <th></th>
          </tr>
          {
            data?.data.map((task: Task) => (
              <tr key={task.taskId}>
                <td>{task.description}</td>
                <td>{task.createAt.toString()}</td>
                <td>{task.active}</td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
