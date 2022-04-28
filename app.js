const todosList = document.querySelector('#todo-list')
const newTodoForm = document.querySelector('#todo-item-form')
const renderCountEl = document.querySelector('#render-count')

// A counter to show how often the page has been updated since it was loaded
// This increases every time a CRUD operation occurs
let renderCount = 1

// Set up form listener to create a new TODO

newTodoForm.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const todoTitle = ev.target[0].value

  // Clear the form now that we have the TODO title
  ev.target.reset()

  // Don't add empty TODOs
  if (!todoTitle) return

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: todoTitle, completed: false })
  }

  fetch('http://localhost:3000/todos', postOptions)
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      render()
    })
})

// Helper functions ...

function toggleCompleted(todo) {
  const patchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed })
  }

  fetch(`http://localhost:3000/todos/${todo.id}`, patchOptions)
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      render() // Re-display the TODO list
    })
}

function deleteTodo(todo) {
  const deleteOptions = {
    method: 'DELETE'
  }

  fetch(`http://localhost:3000/todos/${todo.id}`, deleteOptions)
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      render() // Re-display the TODO list
    })
}

// TODO List rendering

function clearTodosList() {
  todosList.innerHTML = ''
}

function createTodoListElement(todo) {
  // We are going to create the following ...
  // <li><span>{TODO title}</span><button>Del</button></li>
  //
  // Clicking the TODO will toggle its 'completed' status
  // 'Del' button will delete it

  const li = document.createElement('li')

  const span = document.createElement('span')

  span.innerText = `${todo.title} (${todo.id})`
  if (todo.completed) {
    span.className = 'completed'
  } else {
    span.className = 'todo'
  }

  span.addEventListener('click', (ev) => {
    toggleCompleted(todo)
  })

  li.appendChild(span)

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Del'
  deleteButton.className = 'deleteTodo'

  deleteButton.addEventListener('click', (ev) => {
    ev.preventDefault()
    if (window.confirm(`Do you want to delete this TODO? - ${todo.title}`))
      deleteTodo(todo)
  })

  li.appendChild(deleteButton)

  return li
}

function setRenderCount() {
  renderCountEl.innerText = renderCount
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

  setRenderCount()
  renderCount++
}

// Initialise ...

render()

// DONE: Load initial items and populate list
// DONE: Set up submit handler to creat a new todo
//         Send to server and display (re-render all?)
//         Clear form for the next one

// DONE: Add ability to mark todo as complete
// DONE: Add ability to delete a todo
