import "./App.css"
import TaskForm from './components/TaskForm'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <div className="App">
      <section>
        <div>Administración de Tareas</div>
        <TaskForm />
        <TaskList />
      </section>
    </div>
  )
}

export default App
