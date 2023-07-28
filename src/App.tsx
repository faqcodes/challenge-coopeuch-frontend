import { useState } from 'react';
import "./App.css"
import TaskForm from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { Task } from './models/task';
import Container from '@mui/material/Container';

function App() {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const onEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const onCancelEdit = () => {
    setSelectedTask(undefined);
  };

  return (
    <Container maxWidth="md">
      <div className="App">
        <section>
          <h1>Administración de Tareas</h1>
          <TaskForm task={selectedTask} onCancel={onCancelEdit} />
          <br />
          <br />
          <TaskList onEditTask={onEditTask} />
        </section>
      </div>
    </Container>
  )
}

export default App
