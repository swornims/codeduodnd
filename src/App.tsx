import Spells from './components/Spells';
import FavoriteSpell from './components/FavoriteSpell';
import FavoritesContextProvider from './store/favorite-context';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='my-6 mx-10'>
      <FavoritesContextProvider>
        <Navbar />
        <FavoriteSpell />
        <Spells />
      </FavoritesContextProvider>
    </div>
  );
}

export default App;
