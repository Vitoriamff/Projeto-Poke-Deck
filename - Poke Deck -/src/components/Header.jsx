import curriculo from '../assets/curriculo.pdf';

export default function Header({ tema, setTema }) {

  const proximoTema = tema === 'claro' ? 'escuro' : 'claro';

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/logo.png"
          alt="Logo Poke Deck"
          style={{
            width: '100px',
            height: 'auto',
            filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.4))',
          }}
        />
        <h1 style={{ color: tema === 'claro' ? '#141414ff' : '#fff' }}>Poke Deck</h1>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <a
          href={curriculo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #999',
            backgroundColor: tema === 'claro' ? '#f7efef' : '#333',
            color: tema === 'claro' ? '#000' : '#fff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Currículo
        </a>

        <button
          onClick={setTema}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #faf6f6',
            backgroundColor: tema === 'claro' ? '#eee' : '#333',
            color: tema === 'claro' ? '#111' : '#f3efef',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Tema: {proximoTema.charAt(0).toUpperCase() + proximoTema.slice(1)}
        </button>
      </div>
    </header>
  );
}
