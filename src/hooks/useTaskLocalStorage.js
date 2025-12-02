const TASKSLOCALKEY = 'tasks';



const useTaskLocalStorage = () => {
  const getTasks = () => {
    try {
      const saved = localStorage.getItem(TASKSLOCALKEY);
      if (!saved) return [];
      return JSON.parse(saved);
    } catch (error) {
      console.error('Ошибка при чтении задач из localStorage:', error);
      return [];
    }
  };

  const saveTasks = (tasks) => {
    localStorage.setItem(TASKSLOCALKEY, JSON.stringify(tasks));
  };

  return {
    savedTasks: getTasks(),
    saveTasks,
  };
};

export default useTaskLocalStorage;
