import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/pokemon/:id" Component={PokemonDetails} />
      </Routes>
    </Router>
  );
}

export default App;
