import { UI } from "./ui.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("games").classList.remove("d-none");
      document.getElementById("details").classList.add("d-none");
    });

    this.loading = document.querySelector(".loading");
    this.getDetails(id);
  }

  async getDetails(id) {
    this.loading.classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "43401b42f4msh6f7b8f2f7ceecf2p1472e1jsn1f9a10f5559b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(url, options);
    const response = await api.json();

    this.loading.classList.add("d-none");
    new UI().displayDetails(response);
  }
}
