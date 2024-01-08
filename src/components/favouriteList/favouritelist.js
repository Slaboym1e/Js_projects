import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./favouritelist.css";

export class FavouritesList extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("cardlist");
    if (this.appState.favourites.length == 0) {
      this.el.innerHTML = `<h1>В данный момент закладок нет</h1>`;
      return this.el;
    }
    this.el.innerHTML = `<h1>Избранные книги</h1>`;
    for (const card of this.appState.favourites) {
      this.el.append(new Card(this.appState, card).render());
    }
    return this.el;
  }
}
