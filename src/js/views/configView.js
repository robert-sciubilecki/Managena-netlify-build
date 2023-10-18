class ConfigView {
  _parentElement = document.querySelector(".task-manager");

  removeConfigWindow = () => {
    document.removeEventListener("click", this.removeConfigWindow);
    const configWindow = document.querySelector(".config-modal-window");
    if (!configWindow) return;
    configWindow.style.transform = "translateX(100%)";
    setTimeout(() => {
      configWindow.remove();
    }, 400);
  };

  showConfigWindow() {
    const configWindow = document.querySelector(".config-modal-window");
    if (configWindow) return;
    const markup = this._generateMarkup();
    const configElement = document.createElement("div");
    configElement.classList.add("config-modal-window");
    configElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentElement("beforeend", configElement);

    setTimeout(() => {
      configElement.style.transform = "translateX(0)";
      document.addEventListener("click", this.removeConfigWindow);
    }, 1);
  }

  _generateMarkup() {
    return `
      <p class="config-info">
      "There are no configuration options available at the moment, 
      but we're eagerly looking forward to your suggestions! 
      Feel free to continue using Managena as usual. As new features become available, 
      they will be added here."
      </p>
    `;
  }
}

export default new ConfigView();
