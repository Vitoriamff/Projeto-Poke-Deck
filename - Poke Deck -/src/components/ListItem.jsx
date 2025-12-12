export default function ListItem({ pokemon, onSelect }) {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '150px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
        backgroundColor: '#f8f4f4ff',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(pokemon)}
    >
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        width={100} 
        style={{ borderRadius: '5px' }} 
      />

      <p style={{ color: '#000', fontWeight: 'bold' }}>
        {pokemon.name}
      </p>
    </div>
  );
}

