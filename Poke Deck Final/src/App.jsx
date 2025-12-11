import { useState } from 'react';
import { pokemons } from './data/pokemons';
import curriculo from './assets/curriculo.pdf';

function App() {
  const [filtro, setFiltro] = useState('todos');
  const [pagina, setPagina] = useState(1);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [tema, setTema] = useState('claro');
  const itensPorPagina = 5;

  const tipos = ['todos', 'planta', 'fogo', 'agua'];

  const pokemonsFiltrados =
    filtro === 'todos'
      ? pokemons
      : pokemons.filter((p) => p.type === filtro);

  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const pokemonsPagina = pokemonsFiltrados.slice(inicio, fim);

  const totalPaginas = Math.ceil(pokemonsFiltrados.length / itensPorPagina);

  const temaEstilo = {
    backgroundColor: tema === 'claro' ? '#faf8f8ff' : '#121212',
    color: tema === 'claro' ? '#000' : '#fff',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    position: 'relative',
    width: '155%',
    overflowX: 'hidden'
};

  return (
    <div style={temaEstilo}>
      <div style={{ padding: '20px' }}>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>Poke Deck</h1>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={curriculo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid #999',
                backgroundColor: tema === 'claro' ? '#eee' : '#333',
                color: tema === 'claro' ? '#000000ff' : '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
          
              }}
            >
              Currículo
            </a>

            <button
              onClick={() => setTema(tema === 'claro' ? 'escuro' : 'claro')}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid #999',
                backgroundColor: tema === 'claro' ? '#eee' : '#333',
                color: tema === 'claro' ? '#070707ff' : '#fff',
                 marginLeft: '15px'  
              }}
            >
              Tema: {tema === 'claro' ? 'Claro' : 'Escuro'}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => { setFiltro(tipo); setPagina(1); }}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: filtro === tipo ? '#ccc' : '#eee',
                border: '1px solid #999',
                borderRadius: '5px',
                color: '#000',

              }}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {pokemonsPagina.map((pokemon) => (
            <div
              key={pokemon.name}
              style={{
                textAlign: 'center',
                width: '150px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow:
                  tema === 'claro'
                    ? '2px 2px 8px rgba(0,0,0,0.2)'
                    : '2px 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: tema === 'claro' ? '#fffbfbff' : '#1e1e1e',
                border: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => setPokemonSelecionado(pokemon)}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                width={100}
                style={{ borderRadius: '5px' }}
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Anterior
          </button>

          <span>Página {pagina} de {totalPaginas}</span>

          <button
            onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
            disabled={pagina === totalPaginas}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Próxima
          </button>
        </div>
      </div>

<div
  style={{
    position: 'fixed',
    top: 0,
    right: pokemonSelecionado ? 0 : '-525px',
    width: '525px',
    height: '100%',
    backgroundColor: '#000',
    color: '#ffffffff',
    padding: '20px',
    boxShadow: '-2px 0 12px rgba(0,0,0,0.6)',
    zIndex: 1000,
    overflowY: 'auto',
    transition: 'right 0.35s ease',
  }}
>
  {pokemonSelecionado && (
    <>
      <button
        onClick={() => setPokemonSelecionado(null)}
        style={{
          marginBottom: '20px',
          padding: '5px 10px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        Fechar
      </button>

      <img
        src={pokemonSelecionado.image}
        alt={pokemonSelecionado.name}
        width={220}
        style={{ display: 'block', marginBottom: '20px', borderRadius: '10px' }}
      />

      <h2>{pokemonSelecionado.name}</h2>
      <p>Tipo: {pokemonSelecionado.type}</p>
      <p>{pokemonSelecionado.description}</p>
    </>
  )}
</div>

    </div>
  );
}

export default App;

