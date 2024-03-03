export default function Navbar() {
  return (
    <nav className="bg-[#2c2c2c] p-4 text-white flex justify-between items-center">
      <div>
        <h1 className="text-[32px] font-bold">Flixster</h1>
      </div>
      <ul className="flex gap-4">
        <li className="text-xl">Home</li>
        <li className="text-xl">Movies</li>
        <li className="text-xl">TV Show</li>
        <li className="text-xl">Pricing</li>
      </ul>
      <div className="w-1/4 flex justify-end">
        <input
          placeholder="Search movies"
          className="p-2 h-max rounded-full w-[70%] text-xl"
        />
      </div>
    </nav>
  );
}
