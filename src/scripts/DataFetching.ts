// DataFetching.ts

import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

export const fetchData = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151",
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};

export const fetchPokemonTypes = async (
  pokemonList: Pokemon[],
): Promise<string[]> => {
  const typesPromises = pokemonList.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    return response.data.types;
  });

  const typesData = await Promise.all(typesPromises);

  const types = typesData.map((type) =>
    type.map((t: any) => t.type.name).join(", "),
  );
  return types;
};
