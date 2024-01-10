export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}
