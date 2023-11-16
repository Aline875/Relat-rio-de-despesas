import React, { useState } from 'react';

export default function Investimento() {
  const [investimento, setInvestimento] = useState(0);
  const [valorInvestido, setValorInvestido] = useState(0);
  const [retornoCDI, setRetornoCDI] = useState(0);
  const [retornoCDB, setRetornoCDB] = useState(0);
  const [meses, setMeses] = useState(12);

  const calcularRetorno = () => {
    
    const taxaCDI = 0.03;
    const taxaCDB = 0.045;
    
    const investimentoTotal = parseFloat(investimento);
    
    if (investimentoTotal < 0) {
      alert('O valor do investimento não pode ser negativo.');
      return;
    }

    setValorInvestido(investimentoTotal);
    const retornoTotalCDI = investimentoTotal * (1 + taxaCDI) ** (meses / 12);
    setRetornoCDI(retornoTotalCDI.toFixed(2));

    const retornoTotalCDB = investimentoTotal * (1 + taxaCDB) ** (meses / 12);
    setRetornoCDB(retornoTotalCDB.toFixed(2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Calculadora de Investimento</h1>
        <label className="block font-semibold mb-2">Informe o valor do investimento :</label>
        <input
          type="number"
          value={investimento}
          onChange={(e) => setInvestimento(Math.max(0, parseFloat(e.target.value)))}
          max="500"
          className="w-full p-2 border rounded-md mb-4"
        />
        <label className="block font-semibold mb-2">Informe o número de meses:</label>
        <input
          type="number"
          value={meses}
          onChange={(e) => setMeses(Math.max(1, parseInt(e.target.value)))}
          className="w-full p-2 border rounded-md mb-4"
        />
        <button onClick={calcularRetorno} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Calcular
        </button>
        
        {retornoCDI > 0 || retornoCDB > 0 ? (
          <table className="mt-4 w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Tipo de Investimento</th>
                <th className="px-4 py-2">Valor Investido</th>
                <th className="px-4 py-2">Retorno após {meses} meses</th>
              </tr>
            </thead>
            <tbody>
              {retornoCDI > 0 && (
                <tr>
                  <td className="px-4 py-2">CDI</td>
                  <td className="px-4 py-2">R$ {valorInvestido}</td>
                  <td className="px-4 py-2">R$ {retornoCDI}</td>
                </tr>
              )}
              {retornoCDB > 0 && (
                <tr>
                  <td className="px-4 py-2">CDB</td>
                  <td className="px-4 py-2">R$ {valorInvestido}</td>
                  <td className="px-4 py-2">R$ {retornoCDB}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
