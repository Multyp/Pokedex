import { Route, Routes, HashRouter } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/pokemon/:id" Component={PokemonDetails} />
      </Routes>
    </HashRouter>
  );
}

export default App;
