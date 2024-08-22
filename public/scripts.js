const apiUrl = "https://vercel-template-backend.vercel.app/api/todos";

document.addEventListener("DOMContentLoaded", () => {
  fetchTodos();
});

async function fetchTodos() {
  try {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function renderTodos(todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${todo.task}
            <button class="delete" onclick="deleteTodo('${todo._id}')">Delete</button>
            <button onclick="updateTodoPrompt('${todo._id}', '${todo.task}')">Edit</button>
        `;
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const newTaskInput = document.getElementById("new-task");
  const task = newTaskInput.value;

  if (task.trim() === "") {
    alert("Please enter a task");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const newTodo = await response.json();
    newTaskInput.value = "";
    fetchTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${apiUrl}?id=${id}`, { method: "DELETE" });
    fetchTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function updateTodoPrompt(id, currentTask) {
  const newTask = prompt("Update task:", currentTask);
  if (newTask === null || newTask.trim() === "") {
    return;
  }

  updateTodo(id, newTask);
}

async function updateTodo(id, task) {
  try {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    fetchTodos();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}
