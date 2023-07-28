import React, { useEffect, useState } from 'react';

import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/tasks/task-api-slice';
import { Task } from '../models/task';
import { TaskInput } from '../models/task-input';

const TaskForm = ({ task, onCancel }: { task?: Task, onCancel?: () => void }) => {
  const [active, setActive] = useState<boolean>(task?.active ?? true);
  const [description, setDescription] = useState(task?.description ?? '');

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  useEffect(() => {
    if (task) {
      setActive(task.active);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = () => {
    const taskData: TaskInput = {
      active,
      description,
    };

    if (task) {
      updateTask(taskData);

      if (onCancel) {
        onCancel();
      }
    } else {
      createTask(taskData);
    }

    setActive(true);
    setDescription('');
  };

  return (
    <div>
      <h1>{task ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
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
        {task && <button type="button" onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default TaskForm;