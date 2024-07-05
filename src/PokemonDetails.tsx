import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface PokemonDetailsData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { slot: number; type: { name: string; url: string } }[];
}

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PokemonDetailsData>(
          `https://pokeapi.co/api/v2/pokemon/${id}/`,
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonDetails) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="p-5 bg-slate-900 flex items-center justify-center flex-col h-max min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center capitalize">{pokemonDetails.name}</h2>
        <img
          src={`https://img.pokemondb.net/artwork/avif/${pokemonDetails.name}.avif`}
          alt={pokemonDetails.name}
          className="mx-auto w-64 h-64 object-contain"
        />
        <div className="mt-4 text-center">
          <p className="text-xl">
            <strong className="font-semibold">Height:</strong> {pokemonDetails.height / 10} m
          </p>
          <p className="text-xl">
            <strong className="font-semibold">Weight:</strong> {pokemonDetails.weight / 10} kg
          </p>
          <p className="text-xl">
            <strong className="font-semibold">Abilities:</strong>{" "}
            {pokemonDetails.abilities
              .map(ability => ability.ability.name)
              .join(", ")}
          </p>
          <p className="text-xl">
            <strong className="font-semibold">Types:</strong>{" "}
            {pokemonDetails.types.map(type => type.type.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
