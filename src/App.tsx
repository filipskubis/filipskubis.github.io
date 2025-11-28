import Title from "./components/Title.js";
import Search from "./components/Search.js";
import { useState } from "react";
import TypePills from "./components/TypePills.js";
import { PokemonType } from "./types/PokemonType.js";
import PokemonList from "./components/Pokemon/PokemonList.js";
import PokemonDetail from "./components/Pokemon/PokemonDetail.js";
function App() {
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<number[]>([]);
  const [modal, setModal] = useState<string>("");
  console.log(modal);
  return (
    <div className="w-full h-full flex flex-col items-center bg-background p-8 gap-10">
      <Title />
      <Search setSearch={setSearch} search={search} />
      <TypePills active={active} setActive={setActive} />
      <PokemonList types={active} search={search} setModal={setModal} />
      {modal ? <PokemonDetail name={modal} setModal={setModal} /> : null}
    </div>
  );
}

export default App;
