import { WEEK_LENGTH } from "./config";
import { COMPLETED_TASKS_PER_COMPLETED_PAGE } from "./config";

export const state = {
  tasks: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  selectedTask: undefined,
  lastLogin: undefined,
  completedTasks: {
    tasks: [],
    page: 1,
    completedTasksPerCompletedPage: COMPLETED_TASKS_PER_COMPLETED_PAGE,
    numPages: 1,
  },
};

export function createTask(task) {
  state.tasks[task.weekDay].push(task);
  setLocalStorage();
}

export function selectAndReturnTask(id, weekDay) {
  state.selectedTask = state.tasks[weekDay].find((item) => item.id === id);
  return state.selectedTask;
}

export function getTaskFromCompletedList(id) {
  return state.completedTasks.tasks.find((item) => item.id === id);
}

export function getCompletedTasksPage(page = state.completedTasks.page) {
  state.completedTasks.page = page;
  const start =
    (page - 1) * state.completedTasks.completedTasksPerCompletedPage;
  const end = page * state.completedTasks.completedTasksPerCompletedPage;
  return state.completedTasks.tasks.slice(start, end);
}

export function setNumPages() {
  const numPages = Math.ceil(
    state.completedTasks.tasks.length /
      state.completedTasks.completedTasksPerCompletedPage
  );
  state.completedTasks.numPages = numPages;
}

export function getNumPages() {
  return state.completedTasks.numPages;
}

function removeTaskFromState() {
  Object.keys(state.tasks).forEach((day) => {
    const dayArray = state.tasks[day];
    state.tasks[day] = dayArray.filter(
      (task) => task.id !== state.selectedTask.id
    );
  });
  state.selectedTask = undefined;
}

export function completeExpandedTask() {
  const taskToArchive = state.selectedTask;
  taskToArchive.dateCompleted = new Date();
  state.completedTasks.tasks.unshift(taskToArchive);
  setNumPages();
  removeTaskFromState();
  setLocalStorage();
}

export function deleteExpandedTask() {
  removeTaskFromState();
  setLocalStorage();
}

export function getDay(weekDay) {
  return state.tasks[weekDay];
}

export function getDayLength(weekDay) {
  const dayLength = state.tasks[weekDay].reduce(
    (acc, cur) => acc + cur.duration,
    0
  );
  return dayLength;
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// TASK SHIFTING LOGIC /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

export function shiftTasksEngine() {
  const date1 = new Date(state.lastLogin);
  const date2 = new Date().setHours(0, 0, 0, 0);

  // IT WORKS!!!! LEAVE IT ALONE!!!!!!!

  const daysSinceLastLogin = (date2 - date1) / (1000 * 60 * 60 * 24);

  recursiveDayShifter(daysSinceLastLogin, shiftDays);

  setLocalStorage();
}

function recursiveDayShifter(daysSinceLastLogin, shiftDays) {
  if (daysSinceLastLogin <= 0 || daysSinceLastLogin == NaN) return;

  shiftDays();
  recursiveDayShifter(daysSinceLastLogin - 1, shiftDays);
}

function shiftDays() {
  for (let i = 0; i < WEEK_LENGTH; i++) {
    const day0 = i;
    const day1 = i + 1;

    state.tasks[day0].forEach((task) => (task.delay += 1));

    if (!state.tasks[day1]) return;
    let day0Length =
      10 -
      state.tasks[day0].reduce(
        (acc, task) => (acc += Number(task.duration)),
        0
      );
    const tasksToShift = [];
    //   // A note to avoid confusion, task.priorityClass'es are p-high, p-medium, p-low so that's where the object keys come from and that's how I select keys in accumulator

    const {
      "p-high": highPriorityTasks,
      "p-medium": mediumPriorityTasks,
      "p-low": lowPriorityTasks,
    } = state.tasks[day1].reduce(
      (priority, task) => {
        priority[task.priorityClass].push(task);
        return priority;
      },
      { "p-high": [], "p-medium": [], "p-low": [] }
    );

    // //   // Well I know this is not beautiful. But it works. I'll have to come back to this function

    function pushTaskIfPossible(tasks) {
      tasks.forEach((task) => {
        if (day0Length - task.duration >= 0) {
          tasksToShift.push(task);
          day0Length -= task.duration;
        } else {
          task.delay += 1;
        }
      });
    }

    pushTaskIfPossible(highPriorityTasks);
    pushTaskIfPossible(mediumPriorityTasks);
    pushTaskIfPossible(lowPriorityTasks);

    tasksToShift.forEach(
      (task) => (task.weekDay = task.weekDay - 1 > 0 ? task.weekDay - 1 : 0)
    );

    state.tasks[day0] = [...state.tasks[day0], ...tasksToShift];
    state.tasks[day1] = [...state.tasks[day1]].filter(
      (task) => task.weekDay == day1
    );
  }
}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////

function setLocalStorage() {
  const date = new Date().toISOString().split("T")[0];
  localStorage.setItem("lastLogin", JSON.stringify(date));
  // localStorage.setItem("lastLogin", JSON.stringify("10.17.2023"));
  localStorage.setItem("daysList", JSON.stringify(state.tasks));
  localStorage.setItem(
    "completedTasks",
    JSON.stringify(state.completedTasks.tasks)
  );
}

export function loadDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("daysList"));
  state.tasks = data || state.tasks;
  const lastLogin = JSON.parse(localStorage.getItem("lastLogin"));
  state.lastLogin = lastLogin || new Date().toISOString().split("T")[0];
  const completedTaskList = JSON.parse(localStorage.getItem("completedTasks"));
  state.completedTasks.tasks = completedTaskList || state.completedTasks.tasks;
}
