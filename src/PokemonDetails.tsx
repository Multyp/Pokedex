import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface PokemonDetailsData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { slot: number; type: { name: string } }[];
  sprites: { front_default: string };
  species: { url: string };
  stats: { base_stat: number; stat: { name: string } }[];
}

interface SpeciesData {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  habitat: { name: string };
  color: { name: string };
}

const cleanFlavorText = (text: string) => {
  return text
    .replace(/[\n\f\r]/g, ' ')
    .replace(/é/g, 'e')
    .replace(/POK[eE]MON/g, 'pokemon');
};

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsData | null>(null);
  const [speciesData, setSpeciesData] = useState<SpeciesData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get<PokemonDetailsData>(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setPokemonDetails(response.data);

        const speciesResponse = await axios.get<SpeciesData>(response.data.species.url);
        setSpeciesData(speciesResponse.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (!pokemonDetails || !speciesData) {
    return <div className="text-white">Loading...</div>;
  }

  const flavorText = cleanFlavorText(speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || '');
  const genus = speciesData.genera.find(genus => genus.language.name === 'en')?.genus || '';

  return (
<div className="p-6 bg-slate-900 flex items-center justify-center flex-col min-h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center capitalize">{pokemonDetails.name}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center">
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              className="w-64 h-64 object-contain border-2 border-slate-600 rounded-md"
              draggable={false}
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <p className="text-gray-600 italic mb-4 text-center md:text-left">{genus}</p>
            <p className="text-gray-800 mb-4 text-center md:text-left">{flavorText}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xl">
                  <strong className="font-semibold">Height:</strong> {pokemonDetails.height / 10} m
                </p>
                <p className="text-xl">
                  <strong className="font-semibold">Weight:</strong> {pokemonDetails.weight / 10} kg
                </p>
                <p className="text-xl">
                  <strong className="font-semibold">Habitat:</strong> {speciesData.habitat.name}
                </p>
                <p className="text-xl">
                  <strong className="font-semibold">Color:</strong> {speciesData.color.name}
                </p>
              </div>
              <div>
                <p className="text-xl">
                  <strong className="font-semibold">Abilities:</strong>{" "}
                  {pokemonDetails.abilities.map((ability) => ability.ability.name).join(", ")}
                </p>
                <p className="text-xl">
                  <strong className="font-semibold">Types:</strong>{" "}
                  {pokemonDetails.types.map((type) => type.type.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-4">Base Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {pokemonDetails.stats.map((stat) => (
                  <div key={stat.stat.name} className="bg-gray-200 p-2 rounded">
                    <p className="text-lg font-semibold">{stat.stat.name}</p>
                    <p className="text-xl">{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
