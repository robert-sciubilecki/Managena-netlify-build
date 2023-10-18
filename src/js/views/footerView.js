class FooterView {
  constructor() {
    const year = new Date().getFullYear();
    document.querySelector(".footer-date").textContent = year;
  }
}

export default new FooterView();
