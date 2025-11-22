import Todo from './components/Todo';
import { TaskProvider } from './context/TasksContext';


let isLoggedIn = true;

const App = () => {

  return (
    <>
      <TaskProvider>
        <Todo />
      </TaskProvider>
    </>
  )
}

export default App;