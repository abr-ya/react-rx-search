import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/";

export const searchAndFilter = (name: string) =>
  axios
    .get(`${baseUrl}pokemon?limit=1000`)
    .then(({ data }) =>
      data.results.filter((pok: any) => pok.name.includes(name)),
    );
