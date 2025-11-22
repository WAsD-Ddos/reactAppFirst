import { useState, useEffect, useRef, useCallback, useMemo, createContext } from 'react';

export const TasksContext = createContext({});

export const TaskProvider = (props) => {
  const { children } = props;

  const TASKSLOCALKEY = 'tasks';

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(TASKSLOCALKEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { id: 'task-1', title: 'buy milk', isDone: true },
      { id: 'task-2', title: 'Sleep in leras home', isDone: false },
    ]
  })

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  useEffect(() => {
    localStorage.setItem(TASKSLOCALKEY, JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    console.log('current.focus()')
    newTaskInputRef.current.focus();
  }, [])

  function sanitizeSearchQuery(query) {
    return query.trim().toLowerCase().replace(/[^a-z0-9\s]/gi, '');
  }

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

  const filteredTasks = useMemo(() => {
    const sanitizedQuery = sanitizeSearchQuery(searchQuery);
    return sanitizedQuery.length > 0 ? tasks.filter(({ title }) => 
      title.toLowerCase().includes(sanitizedQuery)) : null;
  }, [searchQuery, tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,  
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}