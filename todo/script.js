// DOM elements
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");
const popup = document.getElementById("task-popup");
const popupTitle = document.getElementById("popup-title");
const popupDate = document.getElementById("popup-date");
const popupTime = document.getElementById("popup-time");
const popupNotes = document.getElementById("popup-notes");
const saveNotesBtn = document.getElementById("save-notes");
const closePopupBtn = document.getElementById("close-popup");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTaskId = null;

// Render tasks with sorting
function renderTasks() {
  taskList.innerHTML = "";
  let sortedTasks = [...tasks];
  const sortSelect = document.getElementById("sort-tasks");
  const sortBy = sortSelect ? sortSelect.value : "none";

  if (sortBy === "priority") {
    // high(1), medium(2), low(3)
    sortedTasks.sort((a, b) => {
      const pOrder = { high: 1, medium: 2, low: 3 };
      return pOrder[a.priority] - pOrder[b.priority];
    });
  } else if (sortBy === "date") {
    sortedTasks.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    });
  } else if (sortBy === "time") {
    sortedTasks.sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });
  }

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.text} (${task.priority})</span>
      <button onclick="deleteTask(${tasks.indexOf(task)})">remove</button>
    `;
    li.onclick = () => openPopup(tasks.indexOf(task));
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Listen for sort changes
const sortSelect = document.getElementById("sort-tasks");
if (sortSelect) {
  sortSelect.onchange = renderTasks;
}

// Add task
addBtn.onclick = () => {
  const text = document.getElementById("task-text").value;
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;
  const priority = document.getElementById("task-priority").value;

  if (text.trim() === "") return;

  tasks.push({ text, date, time, priority, completed: false, notes: "" });
  document.getElementById("task-text").value = "";
  renderTasks();
};

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}


// Open popup
function openPopup(index) {
  currentTaskId = index;
  const task = tasks[index];
  popupTitle.textContent = task.text;
  popupDate.textContent = `📅 ${task.date || "No date"}`;
  popupTime.textContent = `⏰ ${task.time || "No time"}`;
  popupNotes.value = task.notes || "";
  popup.classList.remove("hidden");
}

// Save notes/links for the current task
saveNotesBtn.onclick = function () {
  if (currentTaskId !== null) {
    tasks[currentTaskId].notes = popupNotes.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    popup.classList.add("hidden");
  }
};

// Close popup without saving
closePopupBtn.onclick = function () {
  popup.classList.add("hidden");
};


themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
};

// start
renderTasks();
