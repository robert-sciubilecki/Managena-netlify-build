import chevronForward from "../../img/icons/chevron-forward-circle-outline.svg";
import chevronBackward from "../../img/icons/chevron-back-circle-outline.svg";

class PaginationView {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  showPagination(curPage, numPages) {
    this._parentElement.innerHTML = "";

    const markup = this._generateMarkup(curPage, numPages);

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(curPage, numPages) {
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="pagination-btn pagination-btn-next">
          <span>Page ${curPage + 1}</span>
          <img class="icon" src="${chevronForward}"/>
        </button>
      `;
    }

    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="pagination-btn pagination-btn-prev">
          <img class="icon" src="${chevronBackward}"/>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="pagination-btn pagination-btn-prev">
          <img class="icon" src="${chevronBackward}"/>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="pagination-btn pagination-btn-next">
          <span>Page ${curPage + 1}</span>
          <img class="icon" src="${chevronForward}"/>
        </button>
      `;
    }

    return "";
  }
}

export default new PaginationView();
