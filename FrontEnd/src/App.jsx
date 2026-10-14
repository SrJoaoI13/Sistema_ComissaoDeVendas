import { useEffect, useState } from 'react'
import './App.css'

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0)
}

function App() {
  const [comissoes, setComissoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/comissoes')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar dados')
        return res.json()
      })
      .then((data) => {
        setComissoes(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const totalVendas = comissoes.reduce(
    (acc, c) => acc + (c.totalVendas || 0),
    0,
  )
  const totalValorVendas = comissoes.reduce(
    (acc, c) => acc + (c.valorTotalVendas || 0),
    0,
  )
  const totalComissoes = comissoes.reduce(
    (acc, c) => acc + (c.valorTotalComissao || 0),
    0,
  )

  const topVendedor = [...comissoes].sort(
    (a, b) => b.valorTotalComissao - a.valorTotalComissao,
  )[0]

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-badge">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div>
          <h1>Sistema de Comissões</h1>
          <p className="subtitle">Cálculo de comissão por vendedor</p>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Vendedores</span>
            <span className="stat-value">{comissoes.length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total de Vendas</span>
            <span className="stat-value">{totalVendas}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Volume de Vendas</span>
            <span className="stat-value">{formatCurrency(totalValorVendas)}</span>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon gradient">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total em Comissões</span>
            <span className="stat-value">{formatCurrency(totalComissoes)}</span>
          </div>
        </div>
      </section>

      <section className="regras-card glass">
        <h2>Regras de Comissão</h2>
        <div className="regras-list">
          <div className="regra-item">
            <span className="regra-badge danger">0%</span>
            <span>Vendas abaixo de R$ 100,00 — sem comissão</span>
          </div>
          <div className="regra-item">
            <span className="regra-badge warning">1%</span>
            <span>Vendas entre R$ 100,00 e R$ 499,99</span>
          </div>
          <div className="regra-item">
            <span className="regra-badge success">5%</span>
            <span>Vendas a partir de R$ 500,00</span>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="section-header">
          <h2>Ranking de Vendedores</h2>
          {topVendedor && (
            <span className="top-badge">
              Maior comissão: {topVendedor.vendedor}
            </span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando dados...</p>
          </div>
        )}

        {error && (
          <div className="error-state glass">
            <p>
              Erro ao carregar dados: <strong>{error}</strong>
            </p>
            <p className="error-hint">
              Verifique se o backend está rodando em http://localhost:8080
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="cards-grid">
            {comissoes.map((c, index) => (
              <div key={c.vendedor} className="vendedor-card glass" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-top">
                  <div className="avatar">
                    {c.vendedor
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div className="vendedor-info">
                    <h3>{c.vendedor}</h3>
                    <span className="qtd-vendas">{c.totalVendas} vendas</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="info-row">
                    <span>Volume de Vendas</span>
                    <strong>{formatCurrency(c.valorTotalVendas)}</strong>
                  </div>
                  <div className="comissao-row">
                    <span>Comissão Total</span>
                    <strong className="comissao-valor">
                      {formatCurrency(c.valorTotalComissao)}
                    </strong>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(c.valorTotalComissao / totalComissoes) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="tabela-section glass">
            <h3>Detalhamento Completo</h3>
            <div className="table-wrapper">
              <table className="comissao-table">
                <thead>
                  <tr>
                    <th>Vendedor</th>
                    <th>Vendas</th>
                    <th>Volume Total</th>
                    <th>Comissão</th>
                    <th>% do Total</th>
                  </tr>
                </thead>
                <tbody>
                  {comissoes.map((c) => (
                    <tr key={c.vendedor}>
                      <td className="vendedor-cell">
                        <div className="mini-avatar">
                          {c.vendedor
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        {c.vendedor}
                      </td>
                      <td>{c.totalVendas}</td>
                      <td>{formatCurrency(c.valorTotalVendas)}</td>
                      <td className="comissao-valor">
                        {formatCurrency(c.valorTotalComissao)}
                      </td>
                      <td>
                        {((c.valorTotalComissao / totalComissoes) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>Total Geral</td>
                    <td className="comissao-valor total">
                      {formatCurrency(totalComissoes)}
                    </td>
                    <td>100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
