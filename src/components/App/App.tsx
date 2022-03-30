import React from "react";
import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { Modal } from "../Modal/Modal";
import { usePokemonList } from "./usePokemonList";
import { FavoritePokemon } from "../FavoritePokemon/FavoritePokemon";

function App() {
  const {
    pokemonList,
    isLoading,
    error,
    favoritePokemon,
    onToggleFavorite,
    selectedPokemon,
    setSelectedPokemon,
    isFavorite,
  } = usePokemonList();

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        {isLoading && <div>Loading...</div>}
        {error && <div>error</div>}
        <FavoritePokemon
          favoritePokemon={favoritePokemon}
          onToggleFavorite={onToggleFavorite}
          setSelectedPokemon={setSelectedPokemon}
        />
        <ul className={styles.pokemonList}>
          {pokemonList.map((p) => (
            <li key={p.id}>
              <PokemonCard
                pokemon={p}
                onSelect={setSelectedPokemon}
                isFavorite={isFavorite(p)}
                toggleFavorite={onToggleFavorite}
              />
            </li>
          ))}
        </ul>
      </main>
      <Modal
        isOpen={!!selectedPokemon}
        title={selectedPokemon?.name}
        onClose={() => setSelectedPokemon(null)}
      >
        {selectedPokemon && (
          <PokemonCard
            pokemon={selectedPokemon}
            isFavorite={isFavorite(selectedPokemon)}
            toggleFavorite={onToggleFavorite}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
