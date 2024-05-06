import React from 'react'
import { FavoritesContext } from '../store/favorite-context'
import SpellCard from './SpellCard';

const FavoriteSpell = () => {
    const favCtx = React.useContext(FavoritesContext);

    return (
        <div>
            <h1 className='text-3xl'>Favorite Spells</h1>
            {favCtx.favorites.length === 0 ? <p>No favorites added.</p> : ''}
            {favCtx.favorites.length && <ul className='flex w-1000'>
                {favCtx.favorites.map(spell => (
                    <SpellCard key={spell.index} spell={spell} />
                ))}
            </ul>}
        </div>
    )
}

export default FavoriteSpell