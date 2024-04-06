import axios from "axios";
import {
  getPokemonTypes,
  getPokemonsByType,
  getPokemonDetails,
  getAllPokemonsDetails,
} from "../src/api";

jest.mock("axios");

describe("Pokemon Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemonTypes", () => {
    it("should fetch a list of Pokemon types", async () => {
      const mockResponse = {
        data: {
          count: 2,
          next: null,
          previous: null,
          results: [
            { name: "normal", url: "https://pokeapi.co/api/v2/type/1/" },
            { name: "fighting", url: "https://pokeapi.co/api/v2/type/2/" },
          ],
        },
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const types = await getPokemonTypes();

      expect(types).toEqual(mockResponse.data.results);
      expect(axios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/type");
    });

    it("should handle errors", async () => {
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      console.error = jest.fn();

      await getPokemonTypes();

      expect(console.error).toHaveBeenCalledWith(
        "Error while fetching data: ",
        new Error(errorMessage)
      );
    });
  });

  describe("getPokemonsByType", () => {
    it("should fetch a list of Pokemon by type", async () => {
      const type = "normal";
      const mockResponse = {
        data: {
          pokemon: [
            {
              pokemon: {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            },
            {
              pokemon: {
                name: "charmander",
                url: "https://pokeapi.co/api/v2/pokemon/4/",
              },
            },
          ],
        },
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const pokemons = await getPokemonsByType(type);

      expect(pokemons).toEqual(mockResponse.data.pokemon);
      expect(axios.get).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/type/${type}`
      );
    });

    it("should handle errors", async () => {
      const type = "normal";
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      console.error = jest.fn();

      await getPokemonsByType(type);

      expect(console.error).toHaveBeenCalledWith(
        "Error while fetching data:",
        new Error(errorMessage)
      );
    });
  });

  describe("getPokemonDetails", () => {
    it("should fetch details of a Pokemon", async () => {
      const url = "https://pokeapi.co/api/v2/pokemon/1/";
      const mockResponse = {
        data: {
          name: "bulbasaur",
          height: 7,
          weight: 69,
        },
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const details = await getPokemonDetails(url);

      expect(details).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(url);
    });

    it("should handle errors", async () => {
      const url = "https://pokeapi.co/api/v2/pokemon/1/";
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      console.error = jest.fn();

      await getPokemonDetails(url);

      expect(console.error).toHaveBeenCalledWith(
        "Error while fetching data:",
        new Error(errorMessage)
      );
    });
  });

  describe("getAllPokemonsDetails", () => {
    it("should fetch details of all Pokemons in the list", async () => {
      const pokemonList = [
        {
          pokemon: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        },
        {
          pokemon: {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/",
          },
        },
      ];
      const mockResponse1 = {
        data: { name: "bulbasaur", height: 7, weight: 69 },
      };
      const mockResponse2 = {
        data: { name: "charmander", height: 6, weight: 85 },
      };
      axios.get
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const details = await getAllPokemonsDetails(pokemonList);

      expect(details).toEqual([mockResponse1.data, mockResponse2.data]);
      pokemonList.forEach((pokemon) => {
        expect(axios.get).toHaveBeenCalledWith(pokemon.pokemon.url);
      });
    });

    it("should handle errors", async () => {
      const pokemonList = [
        {
          pokemon: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        },
        {
          pokemon: {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/",
          },
        },
      ];
      const errorMessage = "Network Error";
      axios.get.mockRejectedValue(new Error(errorMessage));

      console.error = jest.fn();

      await getAllPokemonsDetails(pokemonList);

      expect(console.error).toHaveBeenCalledWith(
        "Error while fetching data:",
        new Error(errorMessage)
      );
    });
  });
});
