import React from 'react'
import { FavoritesContext } from '../store/favorite-context'
import SpellCard from './SpellCard';

const FavoriteSpell = () => {
    const favCtx = React.useContext(FavoritesContext);

    return (
        <div>
            <h1 className='text-3xl ml-3 mb-5'>Favorite Spells</h1>
            {favCtx.favorites.length === 0 ? <p className='my-8 ml-3'>No favorites added.</p> : ''}
            {
                favCtx.favorites.length > 0 && <ul className='flex my-4'>
                    {favCtx.favorites.map(spell => (
                        <SpellCard key={spell.index} spell={spell} />
                    ))}
                </ul>
            }
        </div >
    )
}

export default FavoriteSpell