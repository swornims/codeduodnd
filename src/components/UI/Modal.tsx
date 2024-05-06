import React from 'react';
import { FavoritesContext } from '../../store/favorite-context';
import { Spell } from '../../models/spell';
import { ModalRef } from '../../models/modal';

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
        <dialog className='rounded p-6 min-w-4 max-w-4xl animate-slideIn' ref={modalRef}>
            <section className='flex items-center mb-5'>
                <h1 className='text-xl font-medium'>{spell.name}</h1>
                <p className='ml-5 border bg-green-950 text-white px-2 py-1 rounded'>Level {spell.level}</p>
            </section>
            <section>
                <p><strong>Description:</strong> {spell.desc.join(' ')}</p>
                <p className='my-1'><strong>Range:</strong> {spell.range}</p>
                <p className='my-1'><strong>Duration:</strong> {spell.duration}</p>
            </section>
            <button className='px-3 py-1 my-4 border bg-yellow-500 text-white rounded hover:bg-white hover:text-yellow-600 transform transition duration-300 hover:scale-115' onClick={handleToggleFavorite}>
                {!isFavorite ? 'Add to Favorites' : 'Remove from Favorites'}
            </button>
            <button className='px-3 py-1 my-4 ml-4 border border-red-600 text-red-600 hover:bg-red-600 rounded hover:text-white transform transition duration-300 hover:scale-115' onClick={() => modalRef.current?.close()}>Close</button>
        </dialog>
    );
});

export default Modal;