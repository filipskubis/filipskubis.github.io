import { SetStateAction, useEffect, useRef, useState } from "react";
//@ts-ignore-next-line
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { PokemonType } from "@/types/PokemonType";
import { useInView } from "react-intersection-observer";

export default function PokemonTile({
  url = "",
  setModal,
}: {
  url: string;
  setModal: React.Dispatch<SetStateAction<string>>;
}) {
  const [data, setData] = useState<{
    name: string;
    types: string[];
    sprite: string;
  }>({
    name: "",
    types: [],
    sprite: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  useEffect(() => {
    async function fetchPokemon() {
      if (!inView) return;
      const response = await fetch(url);

      const results = await response.json();
      setData({
        name: results.name,
        types: results.types.map((type: { type: { name: any } }) => {
          return type.type.name;
        }),
        sprite: results.sprites.front_default,
      });
      setLoading(false);
    }
    fetchPokemon();
  }, [url, inView]);

  const getBackgroundStyle = (types: string[]) => {
    if (types.length === 1) {
      return {
        background: colors[types[0] as PokemonType] || "#FFFFFF",
      };
    }

    return {
      background: `linear-gradient(135deg, ${
        colors[types[0] as PokemonType]
      } 0%, ${colors[types[1] as PokemonType]} 100%)`,
    };
  };

  if (!inView) {
    return (
      <div
        className="w-full h-[300px] bg-[#1E1E1E] animate-pulse rounded-xl"
        ref={ref}
      ></div>
    );
  }

  if (!loading && inView) {
    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          setModal(data.name);
        }}
        className={`flex flex-col items-center text-white rounded-xl py-4 gap-2 cursor-pointer transition-transform hover:-translate-y-1`}
        style={
          data?.types
            ? getBackgroundStyle(data.types)
            : { background: "#FFFFFF" }
        }
      >
        <img src={data.sprite} className="w-[150px]" loading="lazy" />
        <p className="text-3xl font-bold">
          {" "}
          {capitalizeFirstLetter(data.name)}
        </p>
        <p>#{String(url.split("/").filter(Boolean).pop()).padStart(3, "0")}</p>
        <div className="flex gap-4">
          {data.types.map((type) => {
            return (
              <div
                className="bg-[#FFFFFF50] rounded-2xl px-4 py-0.5 grid place-content-center"
                key={type + data.name}
              >
                <p className="leading-full">{capitalizeFirstLetter(type)}</p>
              </div>
            );
          })}
        </div>
      </button>
    );
  }
}
