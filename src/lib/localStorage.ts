import type { Abilities, Pokemon } from "../types/pokemon";

type KeyValues = {
  favoritePokemon: Pokemon[];
  favoriteAbilities: Abilities[];
};

type LocalStorageItem = {
  data: unknown;
  timestamp: number;
};

export const saveData = <T extends keyof KeyValues>(
  key: T,
  data: KeyValues[T]
) => {
  const transformedData: LocalStorageItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(transformedData));
};

export const getData = <T extends keyof KeyValues>(
  key: T
): KeyValues[T] | undefined => {
  const item = localStorage.getItem(key);

  const localStorageItem: LocalStorageItem = item
    ? JSON.parse(item)
    : undefined;

  return localStorageItem?.data as KeyValues[T];
};
