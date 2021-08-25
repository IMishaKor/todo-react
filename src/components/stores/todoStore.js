import { makeObservable, observable, action } from 'mobx';
import TodoStorage from '../todoStorage/TodoStorage';
import TodoObject from '../todoStorage/TodoObject';

const storage = new TodoStorage();

class TodoStore {
  todoList = [];
  constructor(props) {
    makeObservable(this, {
      todoList: observable,
      getTodo: action,
      editTodo: action,
      creteTodo: action,
      removeTodo: action,
    });
  }

  getTodo() {
    this.todoList = storage.getTodosFromStorage();
  }

  creteTodo(text) {
    let todoObject = new TodoObject({
      id: Date.now(),
      isActive: true,
      text: text,
    });
    todoObject.saveIntoLocalStorage();
    this.todoList = storage.getTodosFromStorage();
  }
  editTodo() {}
  removeTodo() {}
}

export default new TodoStore();

export function getTodoStore(inputElementRef) {
  return makeObservable(
    {
      todoList: [], //storage.getTodosFromStorage(), // getTodoList(),

      getTodosItems() {
        this.todoList = storage.getTodosFromStorage();
      },

      todoInputHandle(text) {
        if (!inputElementRef.current.todoID) {
          let todoObject = new TodoObject({
            id: Date.now(),
            isActive: true,
            text: text,
          });

          //setTodoListState(todoList.concat([todoObject]));

          todoObject.saveIntoLocalStorage();
          //this.todoList = storage.getTodosFromStorage(); //this.todoList.push(todoObject);
          this.getTodosItems();
          console.log(this.todoList);
        } else {
          //setTodoListState(
          this.todoList.map((todoItem) => {
            if (todoItem.id === inputElementRef.current.todoID) {
              todoItem.text = text;

              storage.setTodoIntoStorage('todoObject' + inputElementRef.current.todoID, todoItem);
              console.log('changed todo item:', todoItem);
            }

            return todoItem;
          });
          //);
        }
      },

      removeTodoItem(id) {
        let key = 'todoObject';
        //setTodoListState(todoList.filter((todoItem) => todoItem.id !== id));
        this.todoList.filter((todoItem) => todoItem.id !== id);
        key += id.toString();
        storage.removeTodoFromStorage(key);
        console.log('removed id = ', id);
      },

      changeTodoItemStatus(id) {
        //setTodoListState(
        this.todoList.map((todoItem) => {
          if (todoItem.id === id) {
            todoItem.isActive = !todoItem.isActive;

            storage.setTodoIntoStorage(
              'todoObject' + id.toString(),
              new TodoObject({
                id: todoItem.id,
                isActive: todoItem.isActive,
                text: todoItem.text,
              })
            );

            console.log('changed todo = ', todoItem);
          }

          return todoItem;
        });
        //);
      },
    },
    {
      todoList: observable,
      getTodosItems: action.bound,
      todoInputHandle: action.bound,
      removeTodoItem: action.bound,
      changeTodoItemStatus: action.bound,
    }
  );
}
