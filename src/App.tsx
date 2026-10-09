import { useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Usuario } from './Usuario'

function App() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(() => new Usuario('Alex', 25, '1234'))
  const [tentativa, setTentativa] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [resultado, setResultado] = useState('')

  function verificarTentativa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResultado(
      usuario.verificarSenha(tentativa)
        ? 'Senha correta. Acesso autorizado.'
        : 'Senha incorreta. Tente novamente.',
    )
  }

  function redefinirSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const usuarioAtualizado = new Usuario(usuario.nome, usuario.idade, usuario.senha)

    if (!usuarioAtualizado.redefinirSenha(novaSenha)) {
      setResultado('Digite uma nova senha para redefini-la.')
      return
    }

    setUsuario(usuarioAtualizado)
    setTentativa('')
    setNovaSenha('')
    setResultado('Senha redefinida. Você já pode tentar a nova senha.')
    navigate('/')
  }

  return (
    <main className="page">
      <header className="page-header">
        <span className="eyebrow">MEU ESPAÇO</span>
        <h1>Acesso do usuário</h1>
        <p>{usuario.apresentar()}</p>
      </header>

      <div className="login-panel">
        <Routes>
          <Route
            path="/"
            element={
              <section className="form-section" aria-labelledby="login-heading">
                <h2 id="login-heading">Entrar no sistema</h2>
                <form onSubmit={verificarTentativa}>
                  <label htmlFor="tentativa">Sua senha</label>
                  <input
                    id="tentativa"
                    type="password"
                    autoComplete="current-password"
                    value={tentativa}
                    onChange={(event) => setTentativa(event.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                  <button type="submit">Entrar</button>
                </form>
                <Link className="route-link" to="/redefinir-senha">
                  Esqueci minha senha
                </Link>
              </section>
            }
          />
          <Route
            path="/redefinir-senha"
            element={
              <section className="form-section" aria-labelledby="reset-heading">
                <h2 id="reset-heading">Redefinir senha</h2>
                <form onSubmit={redefinirSenha}>
                  <label htmlFor="nova-senha">Escolha uma nova senha</label>
                  <input
                    id="nova-senha"
                    type="password"
                    autoComplete="new-password"
                    value={novaSenha}
                    onChange={(event) => setNovaSenha(event.target.value)}
                    placeholder="Digite a nova senha"
                    required
                  />
                  <button className="secondary-button" type="submit">
                    Salvar senha
                  </button>
                </form>
                <Link className="route-link" to="/">
                  Voltar para entrar
                </Link>
              </section>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {resultado && (
          <p className="result" role="status" aria-live="polite">
            {resultado}
          </p>
        )}
      </div>
    </main>
  )
}

export default App
