// PokemonList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string, url: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchData();
  }, []);

  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const pokemon = pokemonList[index];
    return (
      <Link to={`/pokemon/${index + 1}`} style={style}>
        <div className="bg-gray-200 p-4 m-2 rounded-md cursor-pointer hover:bg-gray-300">
          {pokemon.name}
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">Pokémon List</h2>
      <List
        height={400}
        itemCount={pokemonList.length}
        itemSize={60}
        width={300}
      >
        {Row}
      </List>
    </div>
  );
};

export default PokemonList;
