/* Global imports */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
/* Scoped imports */
/* Local imports */
import { fetchData, fetchPokemonTypes } from "./scripts/DataFetching";
import { typeMapper } from "./components/app/TypeImages";

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
    <div className="p-5 bg-slate-900 flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold mb-6 text-gray-200">
        Kanto Pokedex
      </h1>
      <div className="relative overflow-x-auto shadow-md rounded-lg w-full max-w-7xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th
                scope="col"
                className="px-6 py-3"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 text-sm sm:text-base">
                  {capitalizeFirstChar(pokemon.name)}
                </td>
                <td className="px-6 py-4 flex flex-row gap-2">
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

                <td className="px-6 py-4">
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
    </div>
  );
};

export default PokemonList;
