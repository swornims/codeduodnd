import React from 'react';
import { Spell } from '../models/spell';
import SpellCard from './SpellCard';
import { fetchSpells } from '../api';

const EachSpell = () => {
  const [spells, setSpells] = React.useState<Spell[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSpellsData = async () => {
      try {
        const data = await fetchSpells();
        setSpells(data.results)
      } catch (error) {
        console.log("Error fetching spells data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchSpellsData();
  }, []);

  return (
    <div>
      <h1 className='text-3xl ml-3 mb-5'>All Spells</h1>
      {isLoading && <p>Loading spells</p>}
      {!isLoading &&
        <section className='flex flex-wrap'>
          {spells.map(spell => (
            <SpellCard key={spell.index} spell={spell} />
          ))}
        </section>
      }
    </div>
  )
}

export default EachSpell