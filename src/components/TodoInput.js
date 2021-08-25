import React from 'react';
import TodoStore, { getTodoStore } from './stores/todoStore';

function TodoInpunt(props) {
  let [todoInputValue, setTodoInputValue] = React.useState('');

  function submitEventHandler(event) {
    event.preventDefault();

    TodoStore.creteTodo('new todo');

    // console.log('todoID', props.ref.current.todoID);

    // if (todoInputValue.trim()) {
    //   props.onEdit(todoInputValue);
    //   setTodoInputValue('');
    // }
  }

  return (
    <form className="todo-input" onSubmit={submitEventHandler} style={{ margin: '10px 0px' }}>
      <input
        value={todoInputValue}
        onChange={(event) => setTodoInputValue(event.target.value)}
        placeholder="Введите текст заметки"
        ref={props.ref}
      />
      <button type="submit" style={{ margin: '10px' }}>
        Добавить
      </button>
    </form>
  );
}

export default React.forwardRef(TodoInpunt);
