import { Details } from "./details.module.js";
import { UI } from "./ui.module.js";

export class Games {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);
        const category = link.dataset.category;
        const categoryData = this.getGames(category);
      });
    });

    this.loading = document.querySelector(".loading");

    this.home = document.getElementById("games");
    this.details = document.getElementById("details");
    this.btnClose = document.getElementById("btnClose");

    this.ui = new UI();

    this.getGames("MMORPG");
  }

  changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");

    link.classList.add("active");
  }

  async getGames(cat) {
    this.loading.classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "43401b42f4msh6f7b8f2f7ceecf2p1472e1jsn1f9a10f5559b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(url, options);
    const response = await api.json();

    this.ui.displayGames(response);
    this.loading.classList.add("d-none");

    this.showDetails();
  }

  showDetails() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        this.home.classList.add("d-none");
        this.details.classList.remove("d-none");
        new Details(item.dataset.id);
      });
    });
  }
}
