import { useState } from 'react'
import './App.css'

function App() {
  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcularIMC = (e) => {
    e.preventDefault()
    
    if (!altura || !peso) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const alturaMetros = parseFloat(altura) / 100
    const pesoNum = parseFloat(peso)
    
    if (alturaMetros <= 0 || pesoNum <= 0) {
      alert('Por favor, insira valores válidos!')
      return
    }

    const imc = pesoNum / (alturaMetros * alturaMetros)
    const classificacao = obterClassificacao(imc)
    
    setResultado({
      imc: imc.toFixed(2),
      classificacao: classificacao
    })
  }

  const obterClassificacao = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso'
    if (imc < 25) return 'Peso normal'
    if (imc < 30) return 'Sobrepeso'
    if (imc < 35) return 'Obesidade grau I'
    if (imc < 40) return 'Obesidade grau II'
    return 'Obesidade grau III'
  }

  const limparFormulario = () => {
    setAltura('')
    setPeso('')
    setResultado(null)
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Calculadora de IMC</h1>
        
        <form onSubmit={calcularIMC} className="formulario">
          <div className="campo">
            <label htmlFor="altura">Altura (cm):</label>
            <input
              type="number"
              id="altura"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ex: 175"
              min="1"
              step="0.1"
            />
          </div>

          <div className="campo">
            <label htmlFor="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 70"
              min="1"
              step="0.1"
            />
          </div>

          <div className="botoes">
            <button type="submit">Calcular IMC</button>
            <button type="button" onClick={limparFormulario}>Limpar</button>
          </div>
        </form>

        {resultado && (
          <div className="resultado">
            <h2>Resultado</h2>
            <p><strong>IMC:</strong> {resultado.imc}</p>
            <p><strong>Classificação:</strong> {resultado.classificacao}</p>
          </div>
        )}

        <div className="tabela-referencia">
          <h3>Tabela de Classificação do IMC</h3>
          <table>
            <thead>
              <tr>
                <th>IMC</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Menor que 18,5</td>
                <td>Abaixo do peso</td>
              </tr>
              <tr>
                <td>18,5 - 24,9</td>
                <td>Peso normal</td>
              </tr>
              <tr>
                <td>25,0 - 29,9</td>
                <td>Sobrepeso</td>
              </tr>
              <tr>
                <td>30,0 - 34,9</td>
                <td>Obesidade grau I</td>
              </tr>
              <tr>
                <td>35,0 - 39,9</td>
                <td>Obesidade grau II</td>
              </tr>
              <tr>
                <td>Maior que 40,0</td>
                <td>Obesidade grau III</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App