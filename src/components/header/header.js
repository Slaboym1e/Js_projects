import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("header");
    this.el.innerHTML = `
        <a class="header__logo" href="#"
        ><img src="static/logo.svg" alt="Логотип"
      /></a>
      <div class="header__menu">
        <a href="#" class="header__menu__item header__menu__search">
          <img src="static/search.svg" alt="" />
          Поиск
        </a>
        <a href="#favourites" class="header__menu__item header__menu__favourites">
          <img src="static/favorites.svg" alt="" />
          Избранное
        </a>
        <div  class="header__favourites-counter">
        ${this.appState.favourites.length}
        </div>
      </div>
    `;
    return this.el;
  }
}
