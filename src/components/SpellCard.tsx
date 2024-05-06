import React from 'react';
import Modal from './UI/Modal';
import { Spell } from '../models/spell';
import { ModalRef } from '../models/modal';
import { fetchEachSpell } from '../api';

interface SpellCardProps {
    spell: Spell;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell }) => {
    const [selectedSpell, setSelectedSpell] = React.useState<Spell | null>(null);
    const modalRef = React.useRef<ModalRef>(null);

    const spellDetailHandler = async (url: string) => {
        const data = await fetchEachSpell(url);
        setSelectedSpell(data);
        if (modalRef.current) {
            setTimeout(() => modalRef.current?.open(), 0);
        }
    };

    return (
        <>
            <Modal ref={modalRef} spell={selectedSpell} />
            <article className='flex border m-2 px-4 py-2 rounded hover:bg-red-600 transform transition duration-500 hover:text-white hover:scale-105 cursor-pointer' onClick={() => spellDetailHandler(spell.url)}>
                <h3>{spell.name}</h3>
                <p className='ml-3 text-red'>{spell.level}</p>
            </article>
        </>
    );
};

export default SpellCard;