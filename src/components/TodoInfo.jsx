import { memo , useContext , useMemo} from 'react';
import { TasksContext } from '../context/TasksContext';

const TodoInfo = () => {

  const {
    tasks,
    deleteAllTasks,
  } = useContext(TasksContext)
  
  const total = tasks.length;
  const hasTasks = true

  const done = useMemo(()=> {
  return tasks.filter(({ isDone }) => isDone).length
}, [tasks]) 

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button 
        className="todo__delete-all" 
        type="button"
        onClick={deleteAllTasks}
        
        >Delete all</button>

      )}
    </div>
  )
}
export default memo(TodoInfo); 