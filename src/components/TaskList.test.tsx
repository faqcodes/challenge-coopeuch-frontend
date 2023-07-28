import { Provider } from 'react-redux';
import { TaskList } from './TaskList';
import { fireEvent, queryByText, render, renderHook, screen, waitFor } from '@testing-library/react';
import { createStore } from '../app/store';
import { useState } from 'react';
import { useDeleteTaskMutation } from '../features/tasks/task-api-slice';

const task = {
  id: 1,
  description: 'Descripcion',
  createAt: new Date(),
  active: true,
};

describe('TaskList', () => {

  it('should render the task list', async () => {
    render(
      <Provider store={createStore()}>
        <TaskList onEditTask={() => { }} />
      </Provider>
    );

    const description = await waitFor(() => screen.getByText(/Descripción/i));

    // la tabla es visible
    expect(description).toBeVisible();
  });

  // it('should call the deleteTask mutation when the delete button is clicked', async () => {
  //   const [deleted] = renderHook(() => useDeleteTaskMutation()).result.current;

  //   render(
  //     <Provider store={createStore()}>
  //       <TaskList onEditTask={() => { }} />
  //     </Provider>
  //   );

  //   const deleteButton = screen.queryByText(/Eliminar/i);
  //   deleteButton?.click();

  //   expect(deleted).toBeCalled()
  // });

});