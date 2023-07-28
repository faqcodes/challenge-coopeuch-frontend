
import { useDeleteTaskMutation, useGetTasksQuery } from '../features/tasks/task-api-slice'
import { Task } from '../models/task'
import Button from '@mui/material/Button';
import '../App.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const TaskList = ({ onEditTask }: { onEditTask: (task: Task) => void }) => {
  const { data: message, isLoading, isFetching, isError } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const onDeleteTask = (id: number) => {
    deleteTask(id);
  };

  if (isError || message?.code === 'ERROR') {
    return <div>
      <div>Ha ocurrido un error!</div>
      <div>{message?.message}</div>
    </div>
  }

  if (isLoading) return <div>cargando...</div>

  return (
    <div>
      <table className="App-table-with">
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
                  <IconButton onClick={() => onEditTask(task)} aria-label="edit" size="small" color="primary">
                    <EditIcon fontSize="inherit" />
                  </IconButton>                  
                  <IconButton onClick={() => onDeleteTask(task.taskId)} aria-label="delete" size="small" color="error">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
