import { useContext } from 'react';
import Field from './field';
import { TasksContext } from '../context/TasksContext';

const SearchTaskForm = () => {

  const {
    searchQuery,
    setSearchQuery,
  } = useContext(TasksContext);


  return (
    <form
      className='todo__form'
      onSubmit={(event) => { event.preventDefault() }}
    >
      <Field
        className='todo__field'
        label='Search task'
        id='search-task'
        type='search'
        value={searchQuery}
        onInput={(event) => {
          const value = event.target.value;
          if (value.length <= 100) {
            setSearchQuery(value);
          }
        }}
        placeholder="Enter search query (max 100 characters)"
      />
    </form>
  )
}
export default SearchTaskForm


