import Field from './field';
import Button from './Button';

import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  let InputTimer;
  function onSubmit(event) {
    event.preventDefault()
    addTask()
  }
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className='todo__field'
        label='New task title'
        id='new-task'
        value = {newTaskTitle}
        onInput={(event)=>{
          setNewTaskTitle(event.target.value) 
        }}
        ref = {newTaskInputRef}
      />
      <Button
        type='submit'
      >Add</Button>
    </form>
  )
}

export default AddTaskForm