import React, { useRef } from 'react';
import classes from '../styles/spellCard.module.css';
import { Spell } from '../models/spell';
import Modal from './UI/Modal';

interface SpellCardProps {
    spell: Spell;
}

const SpellCard: React.FC<SpellCardProps> = ({ spell }) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const [selectedSpell, setSelectedSpell] = React.useState<Spell | null>(null);
    //   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const spellDetailHandler = async (url: string) => {
        const response = await fetch('https://www.dnd5eapi.co' + url);
        const data = await response.json();
        setSelectedSpell(data);
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <>
            <Modal ref={modalRef} spell={selectedSpell} />
            <li className={classes.card} onClick={() => spellDetailHandler(spell.url)}>
                <h3>{spell.name}</h3>
                <h3 className={classes.level}>{spell.level}</h3>
            </li>
        </>
    );
};

export default SpellCard;