import { SetStateAction } from "react";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter.js";
import type { PokemonType } from "../types/PokemonType";

type PillsProps = {
  active: number[];
  setActive: React.Dispatch<SetStateAction<number[]>>;
};

type PokemonTypeInfo = {
  type: PokemonType;
  color: string;
  id: number;
};

export default function TypePills({ active, setActive }: PillsProps) {
  const types: Record<PokemonType, Omit<PokemonTypeInfo, "type">> = {
    normal: { color: "#A8A77A", id: 1 },
    fire: { color: "#EE8130", id: 10 },
    water: { color: "#6390F0", id: 11 },
    electric: { color: "#F7D02C", id: 13 },
    grass: { color: "#7AC74C", id: 12 },
    ice: { color: "#96D9D6", id: 15 },
    fighting: { color: "#C22E28", id: 2 },
    poison: { color: "#A33EA1", id: 4 },
    ground: { color: "#E2BF65", id: 5 },
    flying: { color: "#A98FF3", id: 3 },
    psychic: { color: "#F95587", id: 14 },
    bug: { color: "#A6B91A", id: 7 },
    rock: { color: "#B6A136", id: 6 },
    ghost: { color: "#735797", id: 8 },
    dragon: { color: "#6F35FC", id: 16 },
    dark: { color: "#705746", id: 17 },
    steel: { color: "#B7B7CE", id: 9 },
    fairy: { color: "#D685AD", id: 18 },
  } as const;

  const toggleButton = (typeId: number) => {
    setActive((current) =>
      current.includes(typeId)
        ? current.filter((id) => id !== typeId)
        : [...current, typeId]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(
        Object.entries(types) as [PokemonType, Omit<PokemonTypeInfo, "type">][]
      ).map(([type, { color, id }]) => (
        <button
          key={type}
          className={`px-4 py-2 rounded-full text-white border-2 border-[#0E0E0E] transition-all cursor-pointer ${
            active.includes(id) ? "-translate-y-1 outline-2 outline-white" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => toggleButton(id)}
        >
          {capitalizeFirstLetter(type)}
        </button>
      ))}
    </div>
  );
}
