import axios from "axios";

export const getPokemonTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");

    return response.data.results;
  } catch (error) {
    console.error("Error while fetching data: ", error);
  }
};

export const getPokemonsByType = async (type) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

    return response.data.pokemon;
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
};

export const getAllPokemonsDetails = async (pokemonList) => {
  try {
    const promises = pokemonList.map((pokemonInfo) =>
      getPokemonDetails(pokemonInfo.pokemon.url)
    );

    const pokemonDetails = await Promise.all(promises);

    return pokemonDetails;
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
};
