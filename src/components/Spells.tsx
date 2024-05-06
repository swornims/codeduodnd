import React from 'react';
import { Spell, SpellsResponse } from '../models/spell';
import SpellCard from './SpellCard';
import classes from '../styles/spells.module.css';

const EachSpell = () => {

  const [spells, setSpells] = React.useState<Spell[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells');
        const data: SpellsResponse = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch spells!')
        }

        setSpells(data.results);
      } catch (error) {
        console.error('Error fetching spells:', error);
      }

      setIsLoading(false);
    };

    fetchSpells();
  }, []);


  return (
    <>
      <h1>All Spells</h1>
      {isLoading && <p>Loading spells</p>}
      {!isLoading && <div>
        <ul className={classes.container}>
          {spells.map(spell => (
            <SpellCard key={spell.index} spell={spell} />
          ))}
        </ul>
      </div>}
    </>
  )
}

export default EachSpell