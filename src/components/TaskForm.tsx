import React, { useEffect, useState } from 'react';

import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/tasks/task-api-slice';
import { Task } from '../models/task';
import { TaskInput } from '../models/task-input';

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

  const onSubmit = async () => {
    const taskData: TaskInput = {
      active,
      description,
    };

    if (task) {
        taskData.taskId = id;

        await updateTask(taskData).unwrap()

        if (onCancel) {
          clear()
          onCancel();
        }
    } else {
      createTask(taskData);
    }

    clear();
  };

  return (
    <div>
      <div>{task ? 'Actualizar Tarea' : 'Crear Tarea'}</div>
      <form onSubmit={onSubmit}>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Vigente:
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        </label>
        <br />
        <button type="submit">
          {
            task
              ? (isUpdating ? 'Actualizando...' : 'Actualizar')
              : (isCreating ? 'Agregando...' : 'Agregar')
          }
        </button>
        {task && <button type="button" onClick={onCancel}>Cancelar</button>}
      </form>
    </div>
  );
};

export default TaskForm;