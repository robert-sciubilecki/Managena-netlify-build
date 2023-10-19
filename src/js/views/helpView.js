import closeIcon from "../../img/icons/close-outline.svg";

class HelpView {
  _parentElement = document.querySelector(".help-modal-window");
  _overlay = document.querySelector(".overlay");

  constructor() {
    this._parentElement.addEventListener(
      "click",
      this._removeHelpWindow.bind(this)
    );
    this._overlay.addEventListener("click", this._removeHelpWindow.bind(this));
  }

  showHelpWindow() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
    this._overlay.classList.add("help-overlay");
  }

  _removeHelpWindow(e) {
    if (
      e.target.classList.contains("close-modal") ||
      e.target.classList.contains("help-ok-btn") ||
      e.target.classList.contains("help-overlay")
    ) {
      this._parentElement.querySelector(".help-modal").remove();
      this._overlay.classList.add("hidden");
      this._overlay.classList.remove("help-overlay");
    }
    return;
  }

  _generateMarkup() {
    // <h3 class="help-heading">This is Managena</h3>
    return `
      <div class="help-modal">
        <div class="modal-title">
          <h2 class="modal-title-heading">Managena Task Manager</h2>
          <img class="close-modal" src="${closeIcon}" alt="close modal window button"/>
        </div>
        <div class="modal-menu menu">

          <p class="help-message">

            Managena is a task management tool designed to help you efficiently 
            manage your daily tasks. Our concept is simple: focus on planning for 
            the next 7 days to ensure your workload remains manageable.
            
            Here's how Managena works:

            <strong>
              Add New Tasks:
            </strong>
            <span class="help-description">
              Whenever you add a new task, you'll be prompted to provide 
              details such as the task name, duration, and priority. 
              While setting a description is optional, it can be helpful for clarity.
            </span>

            <strong>
              Task Details:
            </strong>
            <span class="help-description">
              Clicking on a task will open up the task details, allowing 
              you to review and edit the information as needed.
            </span>

            <strong>
              Completing Tasks:
            </strong>
            <span class="help-description">
              When you complete a task, it will be removed from 
              the current day and transferred to the 'Completed Tasks' 
              tab for your records.
            </span>

            <strong>
              Removing Tasks:
            </strong>
            <span class="help-description">
              You can easily delete tasks by using the trash button.
            </span>

            <strong>
              Current Day:
            </strong>
            <span class="help-description">
              The leftmost area represents the current day, which serves 
              as a reminder for your immediate tasks.
            </span>

            <strong>
              Task Tracking:
            </strong>
            <span class="help-description">
              Tasks scheduled for future dates will automatically shift 
              closer to the present day. This feature encourages 
              you to focus on your current tasks first.
            </span>

            <strong>
              Task Delays:
            </strong>
            <span class="help-description">
              If you fail to complete tasks and there's no available 
              space in the upcoming days, an exclamation mark will 
              be displayed on them. Hover over it to see how many 
              days the task has been delayed.
            </span>
            
            <span class="help-description">
              We hope Managena helps you stay organized and productive. 
              If you have any questions or need further assistance, 
              feel free to reach out!
            </span>

          </p>
          <div class="menu add btn">
            <button class="btn btn-secondary help-ok-btn">Return to Managena</button>
          </div>
        </div>
      </div>
    `;
  }
}

export default new HelpView();
