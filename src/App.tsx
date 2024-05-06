import Spells from './components/Spells';
import FavoriteSpell from './components/FavoriteSpell';
import FavoritesContextProvider from './store/favorite-context';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <FavoritesContextProvider>
      <Navbar />
      <FavoriteSpell />
      <Spells />
    </FavoritesContextProvider>
  );
}

export default App;
