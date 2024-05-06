import React from 'react'
import { FavoritesContext } from '../store/favorite-context'
import SpellCard from './SpellCard';
import classes from '../styles/favoriteSpell.module.css';

const FavoriteSpell = () => {
    const favCtx = React.useContext(FavoritesContext);

    return (
        <>
            <h1>Favorite Spells</h1>

            <ul className={classes.container}>
                {favCtx.favorites.map(spell => (
                    <SpellCard key={spell.index} spell={spell} />
                ))}
            </ul>
        </>
    )
}

export default FavoriteSpell