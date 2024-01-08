import { BaseView } from "../../common/baseView.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/cardlist/cardlist.js";

export class MainView extends BaseView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
    numFound: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.state);
    onChange.unsubscribe(this.appState);
  }

  async loadBookList(query, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query}&offset=${offset}`
    );
    return res.json();
  }

  appStateHook(path) {
    if (path === "favourites") {
      console.log("Favourite Change");
      this.app.children[0].remove();
      this.renderHeader();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery") {
      this.state.loading = true;
      const data = await this.loadBookList(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.numFound = data.numFound;
      this.state.loading = false;
      console.log(data);
      this.state.list = data.docs;

      console.log(this.state.numFound);
    }
    if (path === "loading") {
      this.render();
    }

    if (path === "list") {
      this.render();
    }
  }

  update() {}

  render() {
    const main = document.createElement("div");
    main.innerHTML = ``;
    this.app.innerHTML = "";
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    this.app.append(main);
    //if (this.reRenderHeader) {
    this.renderHeader();
    //this.reRenderHeader = false;
    //}
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
