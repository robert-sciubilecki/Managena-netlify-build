class DaysView {
  _parentElement = document.querySelector(".task-manager");

  renderDays(weekLength) {
    const weekIndex = Array.from({ length: weekLength }, (_, i) => i);
    const today = new Date();
    const markup = weekIndex.map((day) => this._generateMarkup(day, today));
    this._parentElement.insertAdjacentHTML("afterbegin", markup.join(""));
  }

  _generateDateToDisplay(day, today) {
    const relativeDate = new Date();
    relativeDate.setDate(today.getDate() + day);
    const dateToDisplay = new Intl.DateTimeFormat(navigator.language).format(
      relativeDate
    );
    if (day === 0) return "TODAY";
    return dateToDisplay;
  }

  _generateMarkup(day, today) {
    const dateToDisplay = this._generateDateToDisplay(day, today);
    return `
      <div class="day day-${day}">
        <div class="date">
          <h2 class="date-heading"">${dateToDisplay}</h2>
        </div>
        <button class="add-task-btn btn nav-color" data-week-day="${day}" data-date="${dateToDisplay}">
          Add Task
        </button>
        <div class="tasks tasks-day-${day}"></div>
      </div>
    `;
  }
}

export default new DaysView();
