import Field from './field';
import Button from './Button';

import { useContext, useState } from 'react';
import { TasksContext } from '../context/TasksContext';

const AddTaskForm = () => {
  const [error , SetError] = useState('');
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
        error = {error}
        ref = {newTaskInputRef}
      />
      <Button
        type='submit'
        isDisabled = {newTaskTitle.trim().length === 0}
      >Add</Button>
    </form>
  )
}

export default AddTaskForm