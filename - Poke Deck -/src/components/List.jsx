import ListItem from './ListItem';

export default function List({ pokemons, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {pokemons.map((pokemon) => (
        <ListItem key={pokemon.name} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </div>
  );
}
