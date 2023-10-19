import closeIcon from "../../img/icons/close-outline.svg";

class AddTaskView {
  _parentElement = document.querySelector(".add-task-modal-window");
  _overlay = document.querySelector(".overlay");

  constructor() {
    this._parentElement.addEventListener(
      "click",
      this._removeAddTaskWindow.bind(this)
    );
    this._overlay.addEventListener(
      "click",
      this._removeAddTaskWindow.bind(this)
    );
  }

  addHandlerCreateTask(handler) {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-btn")) {
        const modalElement = document.querySelector(".modal-task");
        handler(modalElement);
      }
    });
  }

  renderAddTaskWindow(target) {
    const markup = this._generateMarkup(target);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  renderDayFullError(target) {
    const markup = this._generateDayFullErrorMarkup(target);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  renderDayIsTooShort() {
    if (this._parentElement.querySelector(".error-length")) return;
    this._parentElement
      .querySelector(".duration")
      .insertAdjacentHTML(
        "afterend",
        `<div class="error-msg error-length"><p>This task is too long for this day</p></div>`
      );
  }

  renderMissingTaskName(reset = false) {
    const errMsg = this._parentElement.querySelector(".error-name");
    if (reset) {
      if (errMsg) errMsg.remove();
      return;
    }
    if (this._parentElement.querySelector(".error-name")) return;
    this._parentElement
      .querySelector(".task-input")
      .insertAdjacentHTML(
        "afterend",
        `<div class="error-msg error-name"><p>Please enter a task name</p></div>`
      );
  }

  resetMissingTaskNameError() {
    this.renderMissingTaskName(true);
  }
  clickOverlay() {
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    this._overlay.dispatchEvent(clickEvent);
  }

  _removeAddTaskWindow(e) {
    e.preventDefault();
    if (
      e.target.classList.contains("close-modal") ||
      e.target.classList.contains("overlay") ||
      e.target.classList.contains("ok-btn")
    ) {
      this._parentElement.classList.add("hidden");
      this._overlay.classList.add("hidden");
      setTimeout(() => {
        this._parentElement.innerHTML = "";
      }, 30);
    }
  }

  _generateMarkup(target) {
    return `
      <div class="modal-task modal-window" data-weekDay="${target.dataset.weekDay}">
        <div class="modal-title">
          <h2 class="modal-title-heading">TASK CREATOR</h2>
          <img class="close-modal" src="${closeIcon}" alt="close modal window button"/>
        </div>
        <div class="modal-menu">
          <form class="form" action="">
            <div class="menu task-input">
              <span>Selected date: ${target.dataset.date}</span>
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
                rows="4"
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
            <div class="menu duration">
              <label for="duration">Task duration</label>
              <select class="input" name="duration" id="duration">
                <option class="d-short" value="1d-short">Short</option>
                <option class="d-medium" value="2d-medium">Medium</option>
                <option class="d-long" value="3d-long">Long</option>
              </select>
            </div>
            
            <div class="menu add">
              <button class="add-btn btn-secondary btn">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  _generateDayFullErrorMarkup(target) {
    return `
      <div class="modal-task modal-window" data-weekDay="${target.dataset.weekDay}">
        <div class="modal-title">
          <h2 class="modal-title-heading">Day is full</h2>
          <img class="close-modal" src="${closeIcon}" alt="close modal window button"/>
        </div>
        <div class="modal-menu menu error-menu">
          <span>Selected date: ${target.dataset.date}</span>
          <p class="day-full-message">This day is full. Try completing some tasks first :)</p>
          <div class="menu add btn">
            <button class="ok-btn btn-secondary">Ok! :)</button>
          </div>
        </div>
      </div>
    `;
  }
}

export default new AddTaskView();
