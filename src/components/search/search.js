import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    const value = document.querySelector(".search__input").value;
    console.log(value);
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
    <div class="search__wrapper">
        <img src="static/search.svg" alt="" />
        <input 
        type="text" 
        placeholder="Найти книгу или автора...." 
        class="search__input"
        value="${this.state.searchQuery ? this.state.searchQuery : ""}"/>
    </div>
    <button aria-label="Искать" class="search-button">
        <img src="static/search-white.svg" alt="" class="search-button__image" />
    </button>
    `;
    this.el
      .querySelector("button")
      .addEventListener("click", this.search.bind(this));
    this.el.querySelector("input").addEventListener("keydown", (e) => {
      if (e.code == "Enter") this.search();
    });
    return this.el;
  }
}
