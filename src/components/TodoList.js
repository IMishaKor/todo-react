import React from 'react';
import TodoItem from './TodoItem';
import TodoStore, { getTodoStore } from './stores/todoStore';
import { observer } from 'mobx-react';

const todoStore = getTodoStore();

export default observer(function TodoList(props) {
  console.log(TodoStore.todoList.length);
  React.useEffect(() => {
    console.log('getTodo');
    TodoStore.getTodo();
  }, []);

  return (
    <ul style={{ listStyle: 'none', padding: '0' }}>
      {TodoStore.todoList.map((todoItem) => {
        return (
          <TodoItem
            todoItem={todoItem}
            key={todoItem.id}
            onChange={props.onCheckBoxClick}
            onDoubleClick={props.onDoubleClickItem}
          />
        );
      })}
    </ul>
  );
});
