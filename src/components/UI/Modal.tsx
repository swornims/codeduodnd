// import React, { useContext,  useImperativeHandle, useRef, ForwardRefRenderFunction } from 'react';
// import { Spell } from '../../models/spell';
// import { FavoritesContext } from '../../store/favorite-context';
// import { createPortal } from "react-dom";

// interface ModalProps {
//     spell: Spell | null;
// }

// // const Modal: React.FC<ModalProps> = ({ spell, isOpen, onClose }) => {
// //     const favCtx = useContext(FavoritesContext);

// //     if (!spell || !isOpen) return null;

// //     return (
// //         <dialog open={isOpen} className={classes.modalContainer}>
// //             <h1>{spell.name}{spell.level}</h1>
// //             <p>Description: {spell.desc.join(' ')}</p>
// //             <button onClick={() => favCtx.addFav(spell)}>Add to Favorites</button>
// //             <button onClick={onClose}>Close</button>
// //         </dialog>
// //     );
// // };

// // export default Modal;

// const Modal: ForwardRefRenderFunction<HTMLDialogElement, ModalProps> = ({ spell }, ref) => {
//     const dialog = useRef<HTMLDialogElement>(null);
//     const favCtx = useContext(FavoritesContext);

//     useImperativeHandle(ref, () => {
//         return {
//             open() {
//                 dialog.current?.showModal();
//             },
//             close() {
//                 dialog.current?.close();
//             },
//         };
//     });

//     const handleCloseModal = () => {
//         dialog.current?.close();
//     };

//     if (!spell) return null;

//     return createPortal(
//         <dialog ref={dialog}>
//             <h1>{spell.name}{spell.level}</h1>
//             <p>Description: {spell.desc.join(' ')}</p>
//             <button onClick={() => favCtx.addFav(spell)}>Add to Favorites</button>
//             <button onClick={handleCloseModal}>Close</button>
//         </dialog>,
//         document.getElementById('modal-root') as HTMLElement
//     )
// };


// export default Modal;


import React, { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { FavoritesContext } from '../../store/favorite-context';
import { Spell } from '../../models/spell';

interface ModalProps {
    spell: Spell | null;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ spell }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const favCtx = useContext(FavoritesContext);

    useImperativeHandle(ref, () => ({
        open() {
            dialogRef.current?.showModal();
        },
        close() {
            dialogRef.current?.close();
        },
    }));

    const handleCloseModal = () => {
        dialogRef.current?.close();
    };

    if (!spell) return null;

    return createPortal(
        <dialog ref={dialogRef}>
            <h1>
                {spell.name} (Level {spell.level})
            </h1>
            <p>Description: {spell.desc.join(' ')}</p>
            <button onClick={() => favCtx.addFav(spell)}>Add to Favorites</button>
            <button onClick={handleCloseModal}>Close</button>
        </dialog>,
        document.getElementById('modal-root') as HTMLElement
    );
});

export default Modal;