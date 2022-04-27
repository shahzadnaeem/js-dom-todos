const todosList = document.querySelector('#todo-list')
const newTodoForm = document.querySelector('#todo-item-form')

// let li = document.createElement('li')
// li.innerText = 'Hiya!'
// todosList.appendChild(li)

// li = document.createElement('li')
// li.className = 'completed'
// li.innerText = 'See ya!'
// todosList.appendChild(li)

newTodoForm.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const todo = ev.target[0].value

  ev.target.reset()

  console.log(`#TODO: create new todo - ${todo}`)
})

// Todo list rendering ...

function clearTodosList() {
  todosList.innerHTML = ''
}

function createTodoListElement(todo) {
  const li = document.createElement('li')
  li.innerText = `${todo.title} (${todo.id})`
  if (todo.completed) {
    li.className = 'completed'
  } else {
    li.className = 'todo'
  }

  return li
}

function render() {
  clearTodosList()

  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((todo) => {
        todosList.appendChild(createTodoListElement(todo))
      })
    })
}

// Initialise ...

render()

// DONE: Load initial items and populate list
// TODO: Set up submit handler to creat a new todo
//         Send to server and display (re-render all?)
//         Clear form for the next one

// TODO: Add ability to mark todo as complete
// TODO: Add ability to delete a todo
