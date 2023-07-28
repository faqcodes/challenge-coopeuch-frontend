import "./App.css"
import { TaskList } from './components/TaskList'

function App() {
  return (
    <div className="App">
      <section>
        <div>Administración de Tareas</div>
        <TaskList />
      </section>
    </div>
  )
}

export default App
