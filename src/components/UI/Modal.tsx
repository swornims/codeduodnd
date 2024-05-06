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

    return (
        <dialog ref={modalRef}>
            <h1>{spell.name}{spell.level}</h1>
            <p>Description: {spell.desc.join(' ')}</p>
            <button onClick={() => favCtx.addFav(spell)}>Add to Favorites</button>
            <button onClick={() => modalRef.current?.close()}>Close</button>
        </dialog>
    );
});

export default Modal;