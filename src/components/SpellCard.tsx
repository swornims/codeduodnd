import React, { useRef } from 'react';
import Modal from './UI/Modal';
import { Spell } from '../models/spell';

interface SpellCardProps {
    spell: Spell;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell }) => {
    const [selectedSpell, setSelectedSpell] = React.useState<Spell | null>(null);
    const modalRef = useRef<{
        open: () => void;
        close: () => void;
    }>(null);

    const spellDetailHandler = async (url: string) => {
        const response = await fetch('https://www.dnd5eapi.co' + url);
        const data = await response.json();
        setSelectedSpell(data);
        if (modalRef.current) {
            modalRef.current.open();
        }
    };

    return (
        <>
            <Modal ref={modalRef} spell={selectedSpell} />
            <li onClick={() => spellDetailHandler(spell.url)}>
                <h3>{spell.name}</h3>
            </li>
        </>
    );
};

export default SpellCard;