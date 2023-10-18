import * as model from "./model.js";
import navigationView from "./views/navigationView.js";
import daysView from "./views/daysView.js";
import taskView from "./views/taskView";
import { WEEK_LENGTH } from "./config.js";
import { DAY_LENGTH } from "./config.js";
import addTaskView from "./views/addTaskView.js";
import taskDetailsView from "./views/taskDetailsView.js";
import helpView from "./views/helpView.js";
import completedTasksView from "./views/completedTasksView.js";
import paginationView from "./views/paginationView.js";
import footerView from "./views/footerView.js";
import configView from "./views/configView.js";

function loadWeek() {
  model.loadDataFromLocalStorage();
  model.shiftTasksEngine();
  taskView.renderWeek(model.state.tasks);
  model.setNumPages();
}

function controlOpenAddTaskWindow(target) {
  const selectedDaylength = model.getDayLength(target.dataset.weekDay);
  selectedDaylength >= 10 || addTaskView.renderAddTaskWindow(target);
  selectedDaylength >= 10 && addTaskView.renderDayFullError(target);
}

function controlWarningHover(event) {
  const hoveredTaskId = event.target.closest(".task").dataset.id;
  const hoveredTaskWeekDay = event.target
    .closest(".day")
    .querySelector(".add-task-btn").dataset.weekDay;
  const delay = model.selectAndReturnTask(
    hoveredTaskId,
    hoveredTaskWeekDay
  ).delay;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  taskView.renderWarning(delay, { mouseX, mouseY });
}

function controlCreateTask(modalElement) {
  const weekDay = modalElement.getAttribute("data-weekDay");
  const taskInput = modalElement.querySelector("#task-input");
  const descriptionInput = modalElement.querySelector("#description");
  const prioritySelect = modalElement.querySelector("#priority");
  const durationSelect = modalElement.querySelector("#duration");
  const selectedDaylength = model.getDayLength(modalElement.dataset.weekday);

  // This number looks like magic but the reason for it is this: the longer the task duration
  // The bigger is task el in the calendar so it has more space to accommodate more characters
  const allowedNumOfCharactersValues = {
    1: 13,
    2: 30,
    3: 75,
  };

  const taskDuration = durationSelect.value[0];
  const allowedNumOfCharacters = allowedNumOfCharactersValues[taskDuration];

  const nameToDisplay =
    taskInput.value.length > allowedNumOfCharacters
      ? `${taskInput.value.slice(0, allowedNumOfCharacters)}...`
      : taskInput.value;
  addTaskView.resetMissingTaskNameError();

  if (!taskInput.value) {
    addTaskView.renderMissingTaskName();

    return;
  }

  if (DAY_LENGTH - selectedDaylength < Number(durationSelect.value[0])) {
    addTaskView.renderDayIsTooShort();
    return;
  }

  addTaskView.clickOverlay();
  // Access their values
  const task = {
    id: (new Date().getTime() + "").slice(-5),
    date: new Date(),
    weekDay: Number(weekDay),
    name: taskInput.value,
    nameToDisplay: nameToDisplay,
    description: descriptionInput.value,
    priority: Number(prioritySelect.value[0]),
    priorityClass: prioritySelect.value.slice(1),
    duration: Number(taskDuration),
    durationClass: durationSelect.value.slice(1),
    delay: 0,
  };
  model.createTask(task);
  taskView.renderTask(task);
}

function controlExpandTask(event) {
  const id = event.target.closest(".task").dataset.id;
  const weekDay = event.target.closest(".day").querySelector(".add-task-btn")
    .dataset.weekDay;
  const task = model.selectAndReturnTask(id, weekDay);
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  taskDetailsView.renderExpandTaskWindow(task, { mouseX, mouseY });
}

function callDayRender(weekDay) {
  const data = model.getDay(weekDay);
  taskView.renderDay(data, weekDay);
}

function controlCompleteTask(weekDay) {
  model.completeExpandedTask();
  callDayRender(weekDay);
}

function controlRemoveTask(weekDay) {
  model.deleteExpandedTask();
  callDayRender(weekDay);
}
function controlHelp() {
  helpView.showHelpWindow();
}

function controlPagination(page) {
  completedTasksView.updateCompletedTasks(model.getCompletedTasksPage(page));

  paginationView.showPagination(page, model.getNumPages());
}

function controlCompletedTasksWindowOpen() {
  completedTasksView.showCompletedTasks(model.getCompletedTasksPage());
  paginationView.showPagination(1, model.getNumPages());
}

function controlConfig() {
  configView.showConfigWindow();
}

function init() {
  navigationView.addHandlerHelp(controlHelp);
  navigationView.addHandlerCompletedTasks(controlCompletedTasksWindowOpen);
  navigationView.addHandlerConfig(controlConfig);
  daysView.renderDays(WEEK_LENGTH);
  loadWeek();
  taskView.addHandlerAddTaskBtn(controlOpenAddTaskWindow);
  taskView.addHandlerWarningHover(controlWarningHover);
  taskDetailsView.addHandlerExpandTask(controlExpandTask);
  taskDetailsView.addHandlerCompleteTask(controlCompleteTask);
  taskDetailsView.addHandlerRemoveTask(controlRemoveTask);
  addTaskView.addHandlerCreateTask(controlCreateTask);
  paginationView.addHandlerClick(controlPagination);
}

init();
