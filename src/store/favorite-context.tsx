import React, { ReactNode } from 'react';
import { Spell } from '../models/spell';

type FavoritesContextType = {
    favorites: Spell[];
    addFav: (spell: Spell) => void;
    removeFav: (index: string) => void;
}

interface Props {
    children: ReactNode;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
    favorites: [],
    addFav: () => { },
    removeFav: () => { }
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
            setFavorites((prevFavorites) => [...prevFavorites, spell]);
        }
    };

    const removeFavoriteHandler = (index: any) => {
        setFavorites((prevFavorites) => prevFavorites.filter((spell) => spell.index !== index))
    }

    const contextValue: FavoritesContextType = {
        favorites: favorites,
        addFav: addFavoriteHandler,
        removeFav: removeFavoriteHandler
    }

    return <FavoritesContext.Provider value={contextValue}>
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContextProvider;