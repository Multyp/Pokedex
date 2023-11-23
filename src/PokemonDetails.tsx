import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PokemonDetailsData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
}

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PokemonDetailsData>(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">{pokemonDetails.name}</h2>
      <img
        src={`https://img.pokemondb.net/artwork/avif/${pokemonDetails.name}.avif`}
        alt={pokemonDetails.name}
        className="mx-auto"
      />
      <div className="mt-4">
        <p>
          <strong>Height:</strong> {pokemonDetails.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemonDetails.weight}
        </p>
        <p>
          <strong>Abilities:</strong>{' '}
          {pokemonDetails.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;
