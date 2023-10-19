import alertIcon from "../../img/icons/alert-circle-outline.svg";

class TaskView {
  _parentElement = document.querySelector(".task-manager");

  addHandlerAddTaskBtn(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.classList.contains("add-task-btn")) return;
      handler(e.target);
    });
  }

  addHandlerWarningHover(handler) {
    this._parentElement.addEventListener("mouseover", function (e) {
      if (!e.target.classList.contains("delay-warning")) return;
      handler(e);
    });
    this._parentElement.addEventListener("mouseout", function (e) {
      if (!e.target.classList.contains("delay-warning")) return;
      const warning = this.querySelector(".warning-info");
      if (warning) warning.remove();
    });
  }

  renderTask(task) {
    const html = `
      <div class="task ${task.priorityClass} ${task.durationClass}" data-id=${
      task.id
    }>
        <span class="task-description">${task.nameToDisplay}</span>
        <div class="task-overlay"></div>
        ${
          task.delay === 0
            ? ""
            : `<img class="icon delay-warning" src=${alertIcon}/>`
        }
      </div>
    `;
    document
      .querySelector(`.day-${task.weekDay}`)
      .querySelector(".tasks")
      .insertAdjacentHTML("beforeend", html);
    const newlyCreatedElement = document.querySelector(
      `.day-${task.weekDay} .tasks .task:last-child`
    );
    // this.allTasks = document.querySelectorAll(".task");
    setTimeout(() => newlyCreatedElement.classList.add("fade-in"), 3);
  }

  removeTask(id) {
    const task = document.querySelector(`.task[data-id="${id}"]`);
    task.remove();
  }

  renderDay(day, weekDay) {
    this._parentElement.querySelector(`.tasks-day-${weekDay}`).innerHTML = "";
    day.forEach((task) => {
      this.renderTask(task);
    });
  }

  renderWeek(data) {
    const week = Object.entries(data);
    week.forEach((day) => {
      this.renderDay(day[1], day[0]);
    });
  }

  renderWarning(delay, coors) {
    const { mouseX, mouseY } = coors;
    const newDiv = document.createElement("div");
    newDiv.className = "task-info warning-info hidden";
    newDiv.innerHTML = this._generateWarningMarkup(delay);
    newDiv.style.position = "fixed"; // or 'absolute'
    newDiv.style.left = `${mouseX}px`;
    newDiv.style.top = `${mouseY}px`;
    this._parentElement.appendChild(newDiv);
    setTimeout(() => {
      newDiv.classList.add("old");
      newDiv.classList.remove("hidden");
    }, 20);
  }

  _generateWarningMarkup(delay) {
    return `
      <div class=" warning-window">
        <h2 class="modal-title-heading ">Hurry up!</h2>
      </div>
      <div>
        <p class="modal-description warning-text">This task is ${delay} days late</p>
      </div>
    `;
  }
}

export default new TaskView();
