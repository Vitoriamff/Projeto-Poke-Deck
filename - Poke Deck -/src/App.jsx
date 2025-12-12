import { useState } from 'react';
import { pokemons } from './data/pokemons';
import Header from './components/Header';
import Section from './components/Section';
import List from './components/List';
import Footer from './components/Footer';

function App() {

  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem("tema");
    return salvo === "claro" || salvo === "escuro" ? salvo : "claro";
  });

  function alterarTema() {
    const novoTema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }

  const [filtro, setFiltro] = useState('todos');
  const [pagina, setPagina] = useState(1);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);

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
    backgroundColor: tema === 'claro' ? '#f8f3f3ff' : '#121212',
    color: tema === 'claro' ? '#131212ff' : '#fff',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    width: '136%',
    position: 'relative',
    overflowX: 'hidden'
  };

  return (
    <div style={temaEstilo}>

      <Section>

        <Header tema={tema} setTema={alterarTema} />

  
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

      
        <List pokemons={pokemonsPagina} onSelect={setPokemonSelecionado} />


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

      </Section>

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: pokemonSelecionado ? 0 : '-525px',
          width: '525px',
          height: '100%',
          backgroundColor: '#000',
          color: '#f8f2f2ff',
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
                color: '#e6e3e3ff',
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

      <Footer />

    </div>
  );
}

export default App;
