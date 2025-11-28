export default function Title() {
  return (
    <div className="flex items-center gap-2">
      <img src="/poke-ball.png" className="w-10 h-auto leading-[1.2]" />
      <p className="text-4xl font-bold bg-linear-to-r from-[#F66B01] to-[#FF9800] bg-clip-text text-transparent text-center">
        Pokémon Explorer
      </p>
    </div>
  );
}
