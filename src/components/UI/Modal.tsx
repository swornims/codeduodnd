import React from 'react';
import { FavoritesContext } from '../../store/favorite-context';
import { Spell } from '../../models/spell';

interface ModalRef {
    open: () => void;
    close: () => void;
}

interface ModalProps {
    spell: Spell | null;
}

const Modal = React.forwardRef<ModalRef, ModalProps>(({ spell }, ref) => {
    const modalRef = React.useRef<HTMLDialogElement>(null);
    const favCtx = React.useContext(FavoritesContext);

    React.useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current?.showModal();
        },
        close: () => {
            modalRef.current?.close();
        },
    }));

    if (!spell) return null;

    const isFavorite = favCtx.favorites.some((favorite: Spell) => favorite.index === spell.index);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            favCtx.removeFav(spell.index)
            modalRef.current?.close()
        } else {
            favCtx.addFav(spell)
            modalRef.current?.close()
        }
    }

    return (
        <dialog className='rounded p-6 w-1/2' ref={modalRef}>
            <h1>{spell.name}{spell.level}</h1>
            <p>Description: {spell.desc.join(' ')}</p>
            <button className='px-3 py-1 my-4 border bg-yellow-500 text-white rounded hover:bg-white hover:text-yellow-600 transform transition duration-300 hover:scale-115' onClick={handleToggleFavorite}>
                {!isFavorite ? 'Add to Favorites' : 'Remove from Favorites'}
            </button>
            <button className='px-3 py-1 my-4 ml-4 border border-red-600 text-red-600 hover:bg-red-600 rounded hover:text-white transform transition duration-300 hover:scale-115' onClick={() => modalRef.current?.close()}>Close</button>
        </dialog>
    );
});

export default Modal;