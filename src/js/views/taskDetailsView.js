import trashBinIcon from "../../img/icons/trash-bin-outline.svg";
import closeIcon from "../../img/icons/close-outline.svg";

class TaskDetailsView {
  _parentElement = document.querySelector(".app");
  _updateContainer = document.querySelector(".update-task-window-container");
  constructor() {
    this._parentElement.addEventListener("click", (event) => {
      const detailsWindow = document.querySelector(".task-info");
      const updateWindow = document.querySelector(".update-task-window");

      if (updateWindow) {
        if (event.target.classList.contains("update-task-btn")) {
          console.log("yes");

          updateWindow.remove();
          detailsWindow.remove();
        }
        if (!event.target.closest(".update-task-window")) {
          updateWindow.remove();
          detailsWindow.remove();
        }
        return;
      }

      if (detailsWindow) {
        if (
          event.target.classList.contains("complete-task-btn") ||
          event.target.classList.contains("trash-btn")
        ) {
          detailsWindow.remove();
        }
        if (event.target.closest(".close-modal")) {
          detailsWindow.remove();
        }
        if (!event.target.closest(".task-info")) {
          detailsWindow.remove();
        }
        return;
      }
    });
  }

  removeAllDisplayedDetails() {
    const detailsWindow = document.querySelector(".task-info");
    detailsWindow.remove();
    const updateCompletedTasks = document.querySelector(".update-task-window");
    updateCompletedTasks.remove();
  }

  addHandlerExpandTask(handler) {
    this._parentElement.addEventListener("click", function (event) {
      if (!event.target.closest(".task")) return;
      const warning = this.querySelector(".warning-info");
      if (warning) warning.remove();
      handler(event);
    });
  }

  addHandlerCompleteTask(handler) {
    this._parentElement.addEventListener("click", (event) => {
      if (!event.target.closest(".complete-task-btn")) return;
      const weekDay = this.getWeekDay(event);
      this.removeWindow(event);
      handler(weekDay);
    });
  }

  addHandlerRemoveTask(handler) {
    this._parentElement.addEventListener("click", (event) => {
      if (!event.target.closest(".trash-btn")) return;
      const weekDay = this.getWeekDay(event);
      this.removeWindow(event);
      handler(weekDay);
    });
  }

  addHandlerEditTask(handler) {
    this._parentElement.addEventListener("click", (event) => {
      if (!event.target.closest(".modal-description")) return;
      handler(event.target.closest(".modal-description"));
    });
  }

  addHandlerUpdateTask(handler) {
    this._updateContainer.addEventListener("click", (event) => {
      if (!event.target.closest(".update-task-btn")) return;
      const modalElement = document.querySelector(".modal-task");
      handler(modalElement);
    });
  }

  removeWindow(event) {
    event.target.closest(".task-info").remove();
  }

  getWeekDay(event) {
    return Number(
      event.target.closest(".task-info").querySelector(".modal-title").dataset
        .weekDay
    );
  }

  renderExpandTaskWindow(task, coors) {
    const { mouseX, mouseY } = coors;
    const newDiv = document.createElement("div");
    newDiv.className = "task-info hidden";
    newDiv.innerHTML = this._generateMarkup(task);
    newDiv.style.position = "fixed";
    newDiv.style.left = `${mouseX}px`;
    newDiv.style.top = `${mouseY}px`;
    this._parentElement.appendChild(newDiv);
    const viewPortHeigth = window.innerHeight;
    const mouseYFromTheBottom = viewPortHeigth - mouseY;
    const divAfterRender = document.querySelector(".task-info");
    const divHeight = divAfterRender.getBoundingClientRect().height;
    if (divHeight > mouseYFromTheBottom) {
      divAfterRender.style.top = `${viewPortHeigth - divHeight}px`;
    }
    divAfterRender.classList.add("animation-fix");
    setTimeout(() => {
      newDiv.classList.add("old");
      newDiv.classList.remove("hidden");
    }, 30);
  }

  editDescription(target) {
    console.log(target.weekDay);

    const markup = this._generateMarkupForDescriptionEdit(target);
    this._updateContainer.insertAdjacentHTML("afterbegin", markup);

    const taskInput = document.getElementById("task-input");
    const descriptionInput = document.getElementById("description");
    const prioritySelect = document.getElementById("priority");
    // const durationSelect = document.getElementById("duration");
    taskInput.value = target.name;
    descriptionInput.value = target.description;
    prioritySelect.value = `${target.priority}${target.priorityClass}`;
    // durationSelect.value = `${target.duration}${target.durationClass}`;
    this._updateContainer.classList.remove("hidden");
  }

  _generateMarkup(task) {
    const date = new Intl.DateTimeFormat(navigator.language).format(
      new Date(task.date)
    );
    return `
      <div class="modal-title expanded-task" data-week-day="${task.weekDay}" data-id="${task.id}">
        <h2 class="modal-title-heading ">${task.name}</h2>
        <img class="close-modal" src="${closeIcon}" alt="close icon"/>
        <ion-icon class="close-modal" name="close-outline"></ion-icon>
      </div>
      <span class="date-created">Created on ${date}</span>
      <p class="modal-description" data-week-day="${task.weekDay}" data-id="${task.id}">${task.description}</p>
      <div class="task-info-buttons">
        <button class="complete-task-btn btn btn-secondary">Complete!</button>
        <button class="trash-btn task-btn">
          <img class="trash-icon" src="${trashBinIcon}" alt="thrash icon"/>
        </button>
      </div>
    `;
  }

  _generateMarkupForDescriptionEdit(target) {
    return `
      <div class="modal-task modal-window update-task-window" data-weekDay="${target.weekDay}" data-id="${target.id}">
        <div class="modal-title">
          <h2 class="modal-title-heading">Update Task</h2>
          <img class="close-modal" src="${closeIcon}" alt="close modal window button"/>
        </div>
        <div class="modal-menu">
          <form class="form" action="">
            <div class="menu task-input">
              <label for="task-input">Task</label>
              <input class="input" type="text" id="task-input" />
            </div>
            <div class="menu description">
              <label for="description">Short description</label>
              <textarea
                class="description-input"
                name="description"
                id="description"
                cols="30"
                rows="7"
              ></textarea>
            </div>
            <div class="menu priority">
              <label for="priority">Set priority</label>
              <select class="input" name="priority" id="priority">
                <option class="p-low" value="1p-low">Low</option>
                <option class="p-medium" value="2p-medium">Medium</option>
                <option class="p-high" value="3p-high">High</option>
              </select>
            </div>
                        
            <div class="menu add">
              <button class="update-task-btn btn-secondary btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

export default new TaskDetailsView();
