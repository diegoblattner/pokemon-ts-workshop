import { FC } from "react";
import type { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import styles from "./FavoritePokemon.module.css";

type FavoritePokemonProps = {
  favoritePokemon: Pokemon[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
};

export const FavoritePokemon: FC<FavoritePokemonProps> = ({
  favoritePokemon,
  onToggleFavorite,
  setSelectedPokemon,
}) => {
  return (
    <>
      {favoritePokemon.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.title}>Favorite Pokemon</h2>
          <ul className={styles.pokemonList}>
            {favoritePokemon.map((p) => (
              <li key={p.id}>
                <PokemonCard
                  pokemon={p}
                  onSelect={setSelectedPokemon}
                  isFavorite={true}
                  toggleFavorite={onToggleFavorite}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
