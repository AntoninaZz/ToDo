const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = 0;

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key === 'todos') {
      // remember todos & id from local storage
      todos = JSON.parse(localStorage.getItem("todos"));
      id = parseInt(localStorage.getItem("id"));
    } else {
      // set items in local storage
      id = 0;
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('id', id);
    }
  }
  render();
});

class Todo {
  constructor() {
    this.id = id++;
    this.text = this.getText();
    this.checked = false;
  }

  getText() {
    return prompt('Enter a Todo task:')
  }
}

function newTodo() {
  const todo = new Todo();
  todos.push(todo);
  render();
}

function render() {
  list.innerHTML = '';
  todos.map(todo => renderTodo(todo)).forEach(todo => list.appendChild(todo))
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
  // update local storage
  localStorage['todos'] = JSON.stringify(todos);
}

function renderTodo(todo) {
  const li = document.createElement('li');
  li.setAttribute('class', classNames.TODO_ITEM);
  li.innerHTML = `
  <input type="checkbox" class="${classNames.TODO_CHECKBOX}" onchange="changeTodo(${todo.id})" ${todo.checked ? 'checked' : ''}>
  <span class="${classNames.TODO_TEXT}">${todo.text}</span>
  <button class="${classNames.TODO_DELETE}" onclick="deleteTodo(${todo.id})">delete</button>
  `
  return li;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id != id)
  render();
}

function changeTodo(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo)

  // for(let i=0;i<todos.length;i++){
  //   if(todos[i].id ===id){
  //     todos[i].checked = !todos[i].checked
  //     break;
  //   }
  // }

  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
  // update local storage
  localStorage['todos'] = JSON.stringify(todos); 
}
