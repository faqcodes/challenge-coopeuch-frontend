import { expect, test, describe } from 'vitest';
import { setupApiStore } from "../../setupTests";
import { taskApi } from './task-api-slice';
import { TaskInput } from '../../models/task-input';
import { Task } from '../../models/task';
import { Message } from '../../models/message';

describe('Administracion de tareas', () => {

  test('Create Task', () => {
    const storeRef = setupApiStore(taskApi);
    const taskInput: TaskInput = { description: 'Descripcion tarea 1', active: true };

    // fetchMock.mockResponse(JSON.stringify(taskInput));

    return storeRef.store
      .dispatch<any>(
        taskApi.endpoints.createTask.initiate(taskInput)
      )
      .then((action: any) => {
        const { data, isSuccess } = action;

        const message = data as (Message<Task>);

        expect(isSuccess).toBe(true);

        expect(message.data.description).toStrictEqual(taskInput.description);
        expect(message.data.active).toStrictEqual(taskInput.active);
      });
  });

});
