import React, { useEffect, useState } from 'react';

import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/tasks/task-api-slice';
import { Task } from '../models/task';
import { TaskInput } from '../models/task-input';
import Button from '@mui/material/Button';
import '../App.css';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const TaskForm = ({ task, onCancel }: { task?: Task, onCancel?: () => void }) => {
  const [id, setId] = useState(task?.taskId ?? 0);
  const [active, setActive] = useState<boolean>(task?.active ?? true);
  const [description, setDescription] = useState(task?.description ?? '');

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  useEffect(() => {
    if (task) {
      setId(task.taskId);
      setActive(task.active);
      setDescription(task.description);
    }
  }, [task]);

  const clear = () => {
    setId(0);
    setActive(true);
    setDescription('');
  }

  const onCancelEdit = () => {
    if (onCancel) {
      clear()
      onCancel();
    }
  }

  const onSubmit = async () => {
    const taskData: TaskInput = {
      active,
      description,
    };
    try {
      // Si se ha seleccionado una tarea, se edita
      if (task) {
        taskData.taskId = id;

        await updateTask(taskData).unwrap()

        onCancelEdit();
      }
      // Si no se seleccionado, se crea
      else {
        createTask(taskData);
      }

    } catch (error) {
      return <div>
        <div>Ha ocurrido un error</div>
        <div>Detalle: {JSON.stringify(error)}</div>
      </div>
    }

    clear();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <table className="App-table-with">
          <tbody>
            <tr>
              <th>Descripción:</th>
              <th>Vigente:</th>
              <th></th>
            </tr>
            <tr>
              <td><TextField required value={description} onChange={(e) => setDescription(e.target.value)} className="App-table-with" label="campo requerido" variant="outlined" size="small" /></td>
              <td><Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} defaultChecked /></td>
              <td>
                <Button variant="contained" color="success" size="small" type="submit" disabled={description.length === 0}>
                  {
                    task
                      ? (isUpdating ? 'Actualizando...' : 'Actualizar')
                      : (isCreating ? 'Agregando...' : 'Agregar')
                  }
                </Button>
                {task && <Button variant="contained" color="warning" size="small" type="button" onClick={onCancelEdit}>Cancelar</Button>}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TaskForm;