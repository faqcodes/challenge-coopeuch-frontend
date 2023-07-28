import { fireEvent, queryByText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../app/store';
import TaskForm from './TaskForm';
import { useState } from 'react';

const task = {
  id: 1,
  description: 'New task',
  createAt: new Date(),
  active: true,
};

describe('TaskForm', () => {

  it('should render the task form', async () => {
    render(
      <Provider store={createStore()}>
        <TaskForm />
      </Provider>
    );

    expect(screen.getByText('Descripción')).toBeVisible();
    expect(screen.getByText('Vigente')).toBeVisible();

    expect(screen.getByText('Agregar')).toBeVisible();    
  });

  it('should call the createTask mutation when the form is submitted', async () => {
    const [taskCreated, setTaskCreated] = useState(false);

    render(
      <Provider store={createStore()}>
        <TaskForm  />
      </Provider>
    );

    const submitButton = screen.getByText('Crear') ?? new Element;
    submitButton.click();

    expect(taskCreated).toBe(true);
  });
  
});