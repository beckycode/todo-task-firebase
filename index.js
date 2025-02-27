import {
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("task-container");

let isEditing = false;
let editingId = null;

window.addEventListener("DOMContentLoaded", () => {
  onGetTasks(showTaskList);
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!isEditing) saveTask(title.value, description.value);
  else
    updateTask(editingId, {
      title: title.value,
      description: description.value,
    });
  isEditing = false;
  document.getElementById("btn-task-save").innerText = "Save";

  taskForm.reset();
});

const showTaskList = (querySnapshot) => {
  let taskElements = "";

  querySnapshot.forEach((doc) => {
    const task = doc.data();
    taskElements += `
      <div class='card card-body mt-2 border-primary'>
        <h3 class='h5'>${task.title}</h3>
        <p>${task.description}</p>
        <div class='flex'>
        <button class='btn-edit btn btn-primary' data-id='${doc.id}'>Edit</button>
        <button class='btn-delete btn btn-secondary' data-id='${doc.id}'>Delete</button>
        </div>
      </div>
      `;
  });
  tasksContainer.innerHTML = taskElements;

  const btnDeletes = tasksContainer.querySelectorAll(".btn-delete");
  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteTask(id);
    });
  });
  const btnEdits = tasksContainer.querySelectorAll(".btn-edit");
  btnEdits.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const response = await getTask(id);
      taskForm["task-title"].value = response.title;
      taskForm["task-description"].value = response.description;
      editingId = id;
      isEditing = true;

      document.getElementById("btn-task-save").innerText = "Update";
    });
  });
};
