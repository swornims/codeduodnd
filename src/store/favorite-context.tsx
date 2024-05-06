import React, { ReactNode } from 'react';
import { Spell } from '../models/spell';

type FavoritesContextType = {
    favorites: Spell[];
    addFav: (spell: Spell) => void;
}

interface Props {
    children: ReactNode;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
    favorites: [],
    addFav: () => { }
});

const FavoritesContextProvider: React.FC<Props> = ({ children }) => {
    const [favorites, setFavorites] = React.useState<Spell[]>(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavoriteHandler = (spell: Spell) => {
        if (!favorites.some(f => f.index === spell.index)) {
            setFavorites([...favorites, spell]);
        }
    };

    const contextValue: FavoritesContextType = {
        favorites: favorites,
        addFav: addFavoriteHandler
    }

    return <FavoritesContext.Provider value={contextValue}>
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContextProvider;