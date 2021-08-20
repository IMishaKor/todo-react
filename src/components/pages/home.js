import React, { Fragment } from 'react';
import TodoInpunt from '../TodoInput';
import TodoList from '../TodoList';
import Context from '../context';
import TodoObject from '../todoStorage/TodoObject';
import TodoStorage from '../todoStorage/TodoStorage';

export const Home = () => {
  const storage = new TodoStorage();
  const [todoList, setTodoListState] = React.useState(getTodoList());
  const inputElementRef = React.useRef();

  //получение списка todo
  function getTodoList() {
    return storage.getTodosFromStorage();
  }

  //добавление элемента в todo-список
  function addTodoItem(text) {
    let todoObject = new TodoObject({
      id: Date.now(),
      isActive: true,
      text: text,
    });

    setTodoListState(todoList.concat([todoObject]));

    todoObject.saveIntoLocalStorage();
  }

  //удаление элемента todo из списка
  function removeTodoItem(id) {
    let key = 'todoObject';
    setTodoListState(todoList.filter((todoItem) => todoItem.id !== id));
    key += id.toString();
    storage.removeTodoFromStorage(key);
    console.log('removed id = ', id);
  }

  //изменение статуса элемента todo
  function changeTodoItemStatus(id) {
    let key = 'todoObject';

    setTodoListState(
      todoList.map((todoItem) => {
        if (todoItem.id === id) {
          todoItem.isActive = !todoItem.isActive;

          storage.setTodoIntoStorage(
            key + id.toString(),
            new TodoObject({
              id: todoItem.id,
              isActive: todoItem.isActive,
              text: todoItem.text,
            })
          );

          console.log('changed todo = ', todoItem);
        }

        return todoItem;
      })
    );
  }

  //изменение текста элемента todo
  function editingTodoItemText(id) {
    inputElementRef.current.focus();
    //inputElementRef.current.isInEditMode = true;

    setTodoListState(
      todoList.map((todoItem) => {
        if (todoItem.id === id) {
          inputElementRef.current.value = todoItem.text;

          storage.setTodoIntoStorage(
            'todoObject' + id.toString(),
            new TodoObject({
              id: todoItem.id,
              isActive: todoItem.isActive,
              text: inputElementRef.current.value,
            })
          );

          console.log('editingTodoItemText: ', todoItem);
        }

        return todoItem;
      })
    );
  }

  return (
    <Fragment>
      <Context.Provider value={{ removeTodoItem: removeTodoItem }}>
        <div>
          <div>
            <TodoInpunt
              onCreate={addTodoItem}
              ref={inputElementRef}
              //isInEditMode={false}
            />
          </div>

          <div>
            <p>Мои заметки:</p>

            {console.log('todoList.Length = ', todoList.length)}
            {todoList.length ? (
              <TodoList
                todoList={todoList}
                onCheckBoxClick={changeTodoItemStatus}
                onDoubleClickItem={editingTodoItemText}
              ></TodoList>
            ) : (
              <p>У вас нет созданных заметок.</p>
            )}
          </div>
        </div>
      </Context.Provider>
    </Fragment>
  );
};
