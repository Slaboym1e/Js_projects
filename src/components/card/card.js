import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  changeFavourite() {
    const isFavourite = this.appState.favourites.find(
      (b) => b.key == this.cardState.key
    );
    if (!isFavourite) {
      this.appState.favourites.push(this.cardState);
    } else {
      for (let i = 0; i < this.appState.favourites.length; i++) {
        if (this.appState.favourites[i].key === this.cardState.key) {
          this.appState.favourites.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.appState.favourites.length);
    this.render();
  }

  render() {
    const isFavourite = this.appState.favourites.find(
      (b) => b.key == this.cardState.key
    );
    this.el.classList.add("card");
    this.el.innerHTML = `<div class="card__image">
        <img src="https://covers.openlibrary.org/b/olid/${
          this.cardState.cover_edition_key
        }-M.jpg" alt="Обложка" />
    </div>
    <div class="card__info">
        <div class="card__tag">${
          this.cardState.subject ? this.cardState.subject[0] : "Не задано"
        }</div>
        <div class="card__name">
        ${this.cardState.title}
        </div>
        <div class="card__author">${
          this.cardState.author_name
            ? this.cardState.author_name[0]
            : "Отсутствует"
        }</div>
        <div class="card__footer">
            <button class="button_add ${isFavourite ? "button__active" : ""}">
            <img src="static/favourite${
              isFavourite ? "-dark.svg" : "-light.svg"
            }" />
            </button>
        </div>
    </div>`;

    this.el
      .querySelector("button")
      .addEventListener("click", this.changeFavourite.bind(this));
    //console.log(this.el);
    return this.el;
  }
}
