class NavigationView {
  _parentElement = document.querySelector(".main-nav");
  addHandlerHelp(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".help-btn");
      if (!btn) return;
      handler();
    });
  }

  addHandlerCompletedTasks(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".completed-tasks-btn");
      if (!btn) return;
      handler();
    });
  }

  addHandlerConfig(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".config-btn");
      if (!btn) return;
      handler();
    });
  }
}

export default new NavigationView();
