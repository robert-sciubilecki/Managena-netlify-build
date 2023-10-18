import trashBinIcon from "../../img/icons/trash-bin-outline.svg";
import closeIcon from "../../img/icons/close-outline.svg";

class TaskDetailsView {
  _parentElement = document.querySelector(".task-manager");
  constructor() {
    this._parentElement.addEventListener("click", (event) => {

      const openedWindow = this._parentElement.querySelector(".task-info");
      if (!openedWindow) return;
      if (event.target.classList.contains("close-modal")) {
        openedWindow.remove();
        return;
      }
      if (event.target.closest(".task-info")) return;
      openedWindow.remove();
    });
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
      if (!event.target.closest(".complete")) return;
      const weekDay = this.getWeekDay(event);
      this.removeWindow(event);
      handler(weekDay);
    });
  }

  addHandlerRemoveTask(handler) {
    this._parentElement.addEventListener("click", (event) => {
      if (!event.target.closest(".trash")) return;
      const weekDay = this.getWeekDay(event);
      this.removeWindow(event);
      handler(weekDay);
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
    newDiv.style.position = "fixed"; // or 'absolute'
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

  _generateMarkup(task) {
    const date = new Intl.DateTimeFormat(navigator.language).format(
      new Date(task.date)
    );
    return `
      <div class="modal-title expanded-task" data-week-day="${task.weekDay}">
        <h2 class="modal-title-heading ">${task.name}</h2>
        <img class="close-modal" src="${closeIcon}" alt="close icon"/>
        <ion-icon class="close-modal" name="close-outline"></ion-icon>
      </div>
      <span class="date-created">Created on ${date}</span>
      <p class="modal-description expanded-task">${task.description}</p>
      <div class="task-info-buttons">
        <button class="complete btn-secondary">Complete!</button>
        <button class="trash task-btn">
          <img class="trash-icon" src="${trashBinIcon}" alt="thrash icon"/>
        </button>
      </div>
    `;
  }
}

export default new TaskDetailsView();
