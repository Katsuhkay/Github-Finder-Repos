import { useState } from 'react';

import Perfil from './components/Perfil'
import RepoList from './components/RepoList'

function App() {
  const [nomeUsuario, setNomeUsuario] = useState(``);
  const [usuarioNaoEncontrado, setUsuarioNaoEncontrado] = useState(false);

  // Função chamada quando o form é submetido
  const handleSearch = (e) => {
    e.preventDefault(); // evita o reload da página
    const valor = e.target.elements.user.value.trim(); // pega o valor do input
    setNomeUsuario(valor);
  };

  return (
    <>
      <form className="input-container" onSubmit={handleSearch}>
        <input 
          type="text"
          name="user" // importante para pegar com e.target.elements.user
          className="input"
          placeholder="Digite o usuário do GitHub"
        />
        <button type="submit" className="search-btn">🔍 Pesquisar</button>
      </form>

      {usuarioNaoEncontrado && <p style={{color: "red"}}>Usuário não encontrado 😢</p>}

      {nomeUsuario.length > 4 && !usuarioNaoEncontrado && (
        <>
          <Perfil nomeUsuario={nomeUsuario} setUsuarioNaoEncontrado={setUsuarioNaoEncontrado}/>
          <RepoList nomeUsuario={nomeUsuario} />
        </>
      )}
    </>
  )
}

export default App;
