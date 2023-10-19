import closeIcon from "../../img/icons/close-outline.svg";

class CompletedTasksView {
  _parentElement = document.querySelector(".completed-tasks-list");
  _completedTasksBtn = document.querySelector(".completed-tasks-btn");
  _overlay = document.querySelector(".overlay");

  constructor() {
    this._parentElement.addEventListener(
      "click",
      this._removeCompletedTasksWindow.bind(this)
    );
    this._overlay.addEventListener(
      "click",
      this._removeCompletedTasksWindow.bind(this)
    );
  }

  showCompletedTasks(completedTasks) {
    const completedTasksWindowElement = this._parentElement;
    const markup = this._generateMarkup();
    completedTasksWindowElement.classList.add("modal-window");
    completedTasksWindowElement.insertAdjacentHTML("afterbegin", markup);

    const taskItems = completedTasks.map((element) => {
      const dateToDisplay = new Intl.DateTimeFormat(navigator.language).format(
        new Date(element.dateCompleted)
      );
      return `<li class="completed-task-li">${element.name} <em>Completed on ${dateToDisplay}</em></li>`;
    });
    const taskList = this._parentElement.querySelector(".completed-tasks-ul");
    taskList.insertAdjacentHTML("afterbegin", taskItems.join(""));
    completedTasksWindowElement.insertAdjacentHTML(
      "beforeend",
      this._generateButtonMarkup()
    );
    completedTasksWindowElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
    this._overlay.classList.add("completed-overlay");
  }

  updateCompletedTasks(completedTasks) {
    const taskItems = completedTasks.map((element) => {
      const dateToDisplay = new Intl.DateTimeFormat(navigator.language).format(
        new Date(element.dateCompleted)
      );
      return `<li class="completed-task-li">${element.name} <em>Completed on ${dateToDisplay}</em></li>`;
    });
    const taskList = this._parentElement.querySelector(".completed-tasks-ul");

    taskList.innerHTML = taskItems.join("");
  }

  _removeCompletedTasksWindow(e) {
    if (
      e.target.classList.contains("close-modal") ||
      e.target.classList.contains("completed-ok-btn") ||
      e.target.classList.contains("completed-overlay")
    ) {
      this._overlay.classList.remove("completed-overlay");
      this._overlay.classList.add("hidden");
      const paginationElement =
        this._parentElement.querySelector(".pagination");
      this._parentElement.innerHTML = "";
      this._parentElement.insertAdjacentElement(
        "afterbegin",
        paginationElement
      );
      this._parentElement.classList.add("hidden");
    }
    return;
  }
  _generateMarkup() {
    return `
        <div class="modal-title">
          <h2 class="modal-title-heading">Completed Tasks</h2>
          <img class="close-modal" src="${closeIcon}" alt="close modal window button"/>
        </div>
        <div class="modal-menu menu">
          <ul class='completed-tasks-ul'></ul>
        </div>
    `;
  }

  _generateButtonMarkup() {
    return `
      <div class="menu add btn">
        <button class="btn btn-secondary completed-ok-btn">Return to Managena</button>
      </div>
    `;
  }
}

export default new CompletedTasksView();
