import { useEffect, useState } from "react";
import { fetchPokemonList } from "../../api/pokemon";
import { getData, saveData } from "../../lib/localStorage";
import type { Pokemon } from "../../types/pokemon";

export const usePokemonList = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>(
    getData("favoritePokemon") || []
  );
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonList()
      .then((result) => {
        setPokemonList(result);
      })
      .catch((e) => {
        setError(e.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    saveData("favoritePokemon", favoritePokemon); // saves to localStorage
    // updates isFavorite flag for all pokemon
    setPokemonList((prev) =>
      prev.map((p) => ({
        ...p,
        isFavorite: favoritePokemon.some((f) => f.id === p.id),
      }))
    );
  }, [favoritePokemon]);

  const onToggleFavorite = (pokemon: Pokemon) => {
    const index = favoritePokemon.findIndex((f) => f.name === pokemon.name);
    if (index > -1) {
      // already exists, so remove it
      const allFavories = [...favoritePokemon];
      allFavories.splice(index, 1);
      setFavoritePokemon(allFavories);
    } else {
      setFavoritePokemon((prev) => [...prev, { ...pokemon, isFavorite: true }]); // adds new favorite
    }
  };

  const isFavorite = (pokemon: Pokemon) =>
    favoritePokemon.some((f) => f.id === pokemon.id);

  return {
    pokemonList,
    isLoading,
    error,
    favoritePokemon,
    onToggleFavorite,
    selectedPokemon,
    setSelectedPokemon,
    isFavorite,
  };
};
