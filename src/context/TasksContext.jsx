import { useState, useEffect, useRef, useCallback, useMemo, createContext } from 'react';
import useTask from '../hooks/useTasks';
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskScroll';

export const TasksContext = createContext({});

export const TaskProvider = (props) => {
  const { children } = props;

  const TASKSLOCALKEY = 'tasks';
 
  const{
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

  }= useTask()

const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
} = useIncompleteTaskScroll(tasks)


  function sanitizeSearchQuery(query) {
    return query.trim().toLowerCase().replace(/[^a-z0-9\s]/gi, '');
  }

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