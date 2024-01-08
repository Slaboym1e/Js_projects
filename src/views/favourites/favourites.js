import onChange from "on-change";
import { BaseView } from "../../common/baseView";
import { FavouritesList } from "../../components/favouriteList/favouritelist";
import { Header } from "../../components/header/header";

export class FavouritesView extends BaseView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Избранное");
  }

  appStateHook(path) {
    if (path === "favourites") {
      console.log("Favourite Change");
      this.render();
    }
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  render() {
    const favourites = document.createElement("div");
    favourites.innerHTML = ``;
    this.app.innerHTML = "";
    favourites.append(new FavouritesList(this.appState).render());
    this.app.append(favourites);

    //if (this.reRenderHeader) {
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
