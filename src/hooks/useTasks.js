import { useState, useEffect, useRef, useCallback } from 'react';
import useTaskLocalStorage from './useTaskLocalStorage';


const useTask = ()=>{
  const {
    savedTasks,
    saveTasks
  } = useTaskLocalStorage()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [tasks, setTasks] = useState(savedTasks??[
      { id: 'task-1', title: 'buy milk', isDone: true },
      { id: 'task-2', title: 'Sleep in leras home', isDone: false },
    ])

  const newTaskInputRef = useRef(null);



    const deleteAllTasks = useCallback(() => {
      const isConfirm = confirm('Do you really wanted to delete all tasks')
      if (isConfirm) {
        setTasks([])
      }
    }, [])
  
    const deleteTask = useCallback((id) => {
      console.log('delete task with id: ' + id)
      const newTasks = tasks.filter(item => item.id !== id)
      setTasks(newTasks)
    }, [tasks])

    const toggleTaskComplete = useCallback((taskID) => {
        const newTasks = tasks.map(item => {
          if (item.id === taskID) {
            return {
              ...item,
              isDone: !item.isDone
            };
          }
          return item;
        })
        setTasks(newTasks)
      }, [tasks])
    
      const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
          const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title: newTaskTitle,
            isDone: false,
          }
          setTasks((prevTask) => [...prevTask, newTask])
        }
    
        setNewTaskTitle('')
        setSearchQuery('')
      }, [newTaskTitle])
    

        useEffect(() => {
          saveTasks(tasks)
        }, [tasks])
      
        useEffect(() => {
          console.log('current.focus()')
          newTaskInputRef.current.focus();
        }, [])


        return {
                     tasks,

        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        }
}


export default useTask;