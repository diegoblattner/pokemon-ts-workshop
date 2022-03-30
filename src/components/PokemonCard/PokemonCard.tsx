import React, { FC } from "react";
import type { Pokemon } from "../../types/pokemon";
import styles from "./PokemonCard.module.css";

type PokemonCardProps = {
  pokemon: Pokemon;
  onSelect?: (pokemon: Pokemon) => void;
  toggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: boolean;
};

export const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  onSelect,
  toggleFavorite,
  isFavorite,
}) => {
  const onFavorite = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    toggleFavorite(pokemon);
  };
  return (
    <div className={styles.pokemonCard} onClick={() => onSelect?.(pokemon)}>
      <div>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
      </div>
      <div>{pokemon.name}</div>
      <button className={styles.favorite} onClick={onFavorite}>
        {isFavorite ? "🧡" : "🤍"}
      </button>
    </div>
  );
};
