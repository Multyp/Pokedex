import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData, fetchPokemonTypes } from "./scripts/DataFetching";

import BugType from "./assets/icons/bug.svg";
import DarkType from "./assets/icons/dark.svg";
import DragonType from "./assets/icons/dragon.svg";
import ElectricType from "./assets/icons/electric.svg";
import FairyType from "./assets/icons/fairy.svg";
import FireType from "./assets/icons/fire.svg";
import FightingType from "./assets/icons/fighting.svg";
import FlyingType from "./assets/icons/flying.svg";
import GhostType from "./assets/icons/ghost.svg";
import GrassType from "./assets/icons/grass.svg";
import GroundType from "./assets/icons/ground.svg";
import IceType from "./assets/icons/ice.svg";
import NormalType from "./assets/icons/normal.svg";
import PoisonType from "./assets/icons/poison.svg";
import PsychicType from "./assets/icons/psychic.svg";
import RockType from "./assets/icons/rock.svg";
import SteelType from "./assets/icons/steel.svg";
import WaterType from "./assets/icons/water.svg";

const typeMapper: Record<string, { icon: string; class: string }> = {
  bug: { icon: BugType, class: "bg-lime-500 rounded-full p-1" },
  dark: { icon: DarkType, class: "bg-black-400 rounded-full p-1" },
  dragon: { icon: DragonType, class: "bg-blue-900 rounded-full p-1" },
  electric: { icon: ElectricType, class: "bg-amber-400 rounded-full p-1" },
  fairy: { icon: FairyType, class: "bg-fuchsia-300 rounded-full p-1" },
  fighting: { icon: FightingType, class: "bg-amber-700 rounded-full p-1" },
  fire: { icon: FireType, class: "bg-red-600 rounded-full p-1" },
  flying: { icon: FlyingType, class: "bg-cyan-300 rounded-full p-1" },
  ghost: { icon: GhostType, class: "bg-purple-800 rounded-full p-1" },
  grass: { icon: GrassType, class: "bg-green-600 rounded-full p-1" },
  ground: { icon: GroundType, class: "bg-yellow-800 rounded-full p-1" },
  ice: { icon: IceType, class: "bg-blue-300 rounded-full p-1" },
  normal: { icon: NormalType, class: "bg-neutral-400 rounded-full p-1" },
  poison: { icon: PoisonType, class: "bg-violet-900 rounded-full p-1" },
  psychic: { icon: PsychicType, class: "bg-pink-600 rounded-full p-1" },
  rock: { icon: RockType, class: "bg-stone-500 rounded-full p-1" },
  steel: { icon: SteelType, class: "bg-gray-800 rounded-full p-1" },
  water: { icon: WaterType, class: "bg-sky-600 rounded-full p-1" },
};

function getTypeData(types: string[]): { icon: string; class: string }[][] {
  const typeArrays = types.map(typeString => {
    const typeList = typeString.split(", ").map(type => typeMapper[type]);
    return typeList.length > 0 ? typeList : [{ icon: "", class: "" }];
  });

  return typeArrays.map(typeArray =>
    typeArray.filter(
      type => type.icon !== undefined && type.class !== undefined,
    ),
  );
}

function capitalizeFirstChar(inputString: string): string {
  if (inputString.length === 0) {
    return inputString;
  }

  const firstChar = inputString.charAt(0).toUpperCase();
  const restOfString = inputString.slice(1);

  return firstChar + restOfString;
}

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [pokemonTypeData, setPokemonTypeData] = useState<
    { icon: string; class: string }[][][]
  >([]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const data = await fetchData();
        setPokemonList(data);

        if (data.length > 0) {
          const types = await fetchPokemonTypes(data);
          console.log("Fetched types:", types);

          const typeData = types.map(type => getTypeData([type]));
          console.log("Mapped typeData:", typeData);

          setPokemonTypeData(typeData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    updateData();
  }, []);

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Pokémon List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2">Name</th>
            <th className="py-2">Type</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2">{capitalizeFirstChar(pokemon.name)}</td>
              <td className="py-2 flex-row">
                {pokemonTypeData[index] ? (
                  pokemonTypeData[index][0].length === 1 ? (
                    <img
                      src={pokemonTypeData[index][0][0].icon}
                      className={`w-6 h-6 ${pokemonTypeData[index][0][0].class}`}
                    />
                  ) : (
                    pokemonTypeData[index][0].map((type, typeIndex) => (
                      <img
                        key={typeIndex}
                        src={type.icon}
                        className={`w-6 h-6 ${type.class}`}
                      />
                    ))
                  )
                ) : (
                  "Fetching types..."
                )}
              </td>

              <td className="py-2">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="text-blue-500 hover:underline"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
