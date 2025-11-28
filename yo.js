// generatePokedexFile.js
// Fetch all Pokémon names from PokeAPI and generate pokedex.js

import fs from "fs";

async function generatePokedexFile() {
  const limit = 1025;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  console.log("Fetching Pokémon list...");
  const response = await fetch(url);
  const data = await response.json();

  const pokedex = {};
  data.results.forEach((entry, i) => {
    const id = i + 1;
    pokedex[id] = entry.name.toLowerCase();
  });

  const fileContent =
    "export const pokedex = " + JSON.stringify(pokedex, null, 2) + ";\n";
  console.log("yo");
  fs.writeFileSync("pokedex.js", fileContent);

  console.log("✔ pokedex.js generated successfully!");
}

generatePokedexFile().catch((err) => {
  console.error("Error:", err);
});
