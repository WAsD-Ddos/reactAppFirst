/**
 * Функция для сортировки массива задач по индексу
 * 
 * @param {Array} tasks - Массив задач для сортировки
 * @param {string|number} sortBy - Критерий сортировки
 *   'index' - сортировка по порядковому номеру в массиве (по возрастанию)
 *   'index-desc' - сортировка по порядковому номеру в массиве (по убыванию)
 *   'id' - сортировка по id задачи
 * @returns {Array} - Новый отсортированный массив задач
 */
export function sortTasksByIndex(tasks, sortBy = 'index') {
  // Создаем копию массива, чтобы не мутировать оригинальный
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'index':
      // Сортировка по порядковому номеру (индексу) в массиве по возрастанию
      return sortedTasks;
      
    case 'index-desc':
      // Сортировка по порядковому номеру (индексу) в массиве по убыванию
      return sortedTasks.reverse();
      
    case 'id':
      // Сортировка по id задачи (если id содержит числовой индекс)
      return sortedTasks.sort((a, b) => {
        // Извлекаем числовой индекс из id (например, из 'task-3' извлекаем 3)
        const indexA = parseInt(a.id.split('-')[1]) || 0;
        const indexB = parseInt(b.id.split('-')[1]) || 0;
        return indexA - indexB;
      });
      
    default:
      // По умолчанию возвращаем как есть
      return sortedTasks;
  }
}

/**
 * Альтернативная функция для сортировки задач по их реальному индексу в массиве
 * Используется, когда нужно явно задать порядок сортировки
 * 
 * @param {Array} tasks - Массив задач
 * @param {boolean} descending - true для сортировки по убыванию индекса, false - по возрастанию
 * @returns {Array} - Отсортированный массив задач
 */
export function sortTasksByArrayIndex(tasks, descending = false) {
  const sortedTasks = [...tasks];
  
  if (descending) {
    // Сортировка по убыванию индекса (с конца массива)
    return sortedTasks.reverse();
  }
  
  // Сортировка по возрастанию индекса (по порядку в массиве)
  return sortedTasks;
}

/**
 * Функция для перестановки задачи на определенную позицию в массиве
 * 
 * @param {Array} tasks - Исходный массив задач
 * @param {string} taskId - ID задачи, которую нужно переместить
 * @param {number} newIndex - Новая позиция в массиве
 * @returns {Array} - Новый массив с перемещенной задачей
 */
export function moveTaskToIndex(tasks, taskId, newIndex) {
  const taskToMove = tasks.find(task => task.id === taskId);
  if (!taskToMove) return tasks;
  
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  const newTasks = [...filteredTasks];
  newTasks.splice(newIndex, 0, taskToMove);
  
  return newTasks;
}
