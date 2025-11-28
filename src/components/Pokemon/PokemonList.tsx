import { SetStateAction, useEffect, useState } from "react";
import PokemonTile from "./PokemonTile";
import { CircularProgress } from "@mui/material";
//@ts-ignore
import { pokedex } from "./pokedex";

interface Pokemon {
  url: string;
  name: string;
}

export default function PokemonList({
  types,
  search,
  setModal,
}: {
  types: number[];
  search: string;
  setModal: React.Dispatch<SetStateAction<string>>;
}) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonByTypes = async () => {
      setLoading(true);
      if (types.length === 0) {
        setPokemon(
          Array(1024)
            .fill(0)
            .map((_, i) => {
              return {
                name: pokedex[i + 1],
                url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
              };
            })
        );
        setLoading(false);
        return;
      }

      try {
        // Fetch Pokemon for each selected type
        const typePromises = types.map((typeId) =>
          fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
            .then((res) => res.json())
            .then((data) =>
              data.pokemon.map(
                (entry: { pokemon: { name: string; url: string } }) => {
                  return { name: entry.pokemon.name, url: entry.pokemon.url };
                }
              )
            )
        );

        // Wait for all type fetches to complete
        const typeResults = await Promise.all(typePromises);
        let commonPokemon = typeResults[0] || [];
        if (typeResults.length > 1) {
          for (let i = 1; i < typeResults.length; i++) {
            const currentTypeUrls = new Set(
              typeResults[i].map(
                (pokemon: { name: string; url: string }) => pokemon.url
              )
            );
            commonPokemon = commonPokemon.filter(
              (pokemon: { name: string; url: string }) =>
                currentTypeUrls.has(pokemon.url)
            );
          }
        }

        setPokemon(commonPokemon);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonByTypes();
  }, [types]);

  const searchedPokemon = pokemon.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <CircularProgress
        size="3rem"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
          },
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-3 w-full gap-4">
      {searchedPokemon.length > 0 ? (
        searchedPokemon.map((pokemon) => (
          <PokemonTile
            key={pokemon.name}
            url={pokemon.url}
            setModal={setModal}
          />
        ))
      ) : (
        <div className="col-span-3 text-center text-white text-2xl font-bold">
          No Pokemon found matching the selected types and search term.
        </div>
      )}
    </div>
  );
}
