import React, { SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
//@ts-ignore
import SoundPlayer from "../SoundPlayer";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": { front_default: string };
      dream_world: { front_default: string };
    };
  };
  cries: any;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}

export default function PokemonDetail({
  name,
  setModal,
}: {
  name: string;
  setModal: React.Dispatch<SetStateAction<string>>;
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch Pokemon"
        );
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchPokemon();
    }
  }, [name]);

  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p>Loading...</p>
        </div>
      </div>,
      document.getElementById("detail-modal")!
    );
  }

  if (error || !pokemon) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-red-500">{error || "Pokemon not found"}</p>
        </div>
      </div>,
      document.getElementById("detail-modal")!
    );
  }

  const images = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.other["official-artwork"].front_default,
    pokemon.sprites.other.dream_world.front_default,
  ].filter(Boolean);

  const stats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const abilities = pokemon.abilities.map((ability) =>
    ability.ability.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 text-white">
      <div className="bg-[#1E1E1E] rounded-xl w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <button
            onClick={() => setModal("")}
            className="scale-150 transition-transform hover:scale-175 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 flex">
          {/* Image Gallery */}
          <div className="flex flex-col w-max">
            <div className="mb-8">
              <div className="h-64 bg-[#3f3f3f8e] rounded-lg mb-4 flex items-center justify-center">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={pokemon.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No image available</span>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto py-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded border-2 ${
                      activeImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`${pokemon.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full px-4 flex justify-center mt-4!">
              <SoundPlayer url={pokemon.cries.latest} />
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full p-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Base Stats</h3>
              <ul className="space-y-2">
                {stats.map((stat, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-max text-gray-600">
                      {stat.name
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                    <div className="flex-1 bg-[#3f3f3f8e] rounded-full h-4">
                      <div
                        className="bg-blue-500 h-full rounded-full w-full"
                        style={{ width: `${Math.min(100, stat.value)}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-right">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <div>
                <h3 className="text-lg font-semibold mb-3">Abilities</h3>
                <ul className="space-y-2 flex flex-col gap-2">
                  {abilities.map((ability, index) => (
                    <li
                      key={index}
                      className="bg-[#3f3f3f8e] hover:bg-[#3f3f3fc5] px-4 py-2 rounded-lg transition-colors"
                    >
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("detail-modal")!);
}
