export type ApiResult<Result> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

export interface PokemonApi {
  name: string;
  url: string;
}

export type Pokemon = PokemonApi & {
  id: string;
  imageUrl: string;
};

export type Abilities = {
  name: string;
  power: number;
};
