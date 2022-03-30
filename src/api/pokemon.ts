import { ApiResult, Pokemon, PokemonApi } from "../types/pokemon";

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const mapPokemon = (pokemon: PokemonApi): Pokemon => {
  const id = pokemon.url.replace(pokemonUrl, "").replaceAll("/", "");

  return {
    id,
    ...pokemon,
    imageUrl: `${imageUrl}${id}.png`,
  };
};

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const response = await fetch(url);
  const data = (await response.json()) as ApiResult<PokemonApi>; // casting
  return data.results.map((p) => mapPokemon(p));
};
