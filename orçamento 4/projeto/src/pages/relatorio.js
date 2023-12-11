import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RelatorioDespesas = () => {
  const [novoMes, setNovoMes] = useState('');
  const [novaDespesaValor, setNovaDespesaValor] = useState('');
  const [despesas, setDespesas] = useState([
  ]);
  const [aviso, setAviso] = useState('');

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const adicionarDespesa = () => {
    if (novoMes && novaDespesaValor) {
      const novoValor = parseFloat(novaDespesaValor);
      const novoMesValido = novoMes.match(
        /^(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)$/
      );

      if (novoMesValido) {
        const novaDespesa = { mes: novoMes, valor: novoValor };
        setDespesas([...despesas, novaDespesa]);
        setNovaDespesaValor('');
        setNovoMes('');

        if (novoValor > 1000) {
          const diferenca = novoValor - 1000;
          setAviso(`Você ultrapassou em R$${diferenca.toFixed(2)} no mês de ${novoMes}`);
        } else {
          setAviso('');
        }

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: despesas.map((despesa) => despesa.mes),
            datasets: [
              {
                label: 'Valor Gasto',
                data: despesas.map((despesa) => despesa.valor),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Valor Hipotético (R$1000)',
                data: [1000, 1000, 1000, 1000],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
        });
      } else {
        alert('Mês inválido. Insira um mês válido, por exemplo, "Janeiro".');
      }
    } else {
      alert('Por favor, insira tanto o mês quanto o valor da despesa.');
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: despesas.map((despesa) => despesa.mes),
          datasets: [
            {
              label: 'Valor Gasto',
              data: despesas.map((despesa) => despesa.valor),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Valor Hipotético (R$1000)',
              data: [1000, 1000, 1000, 1000],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [despesas]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Relatório de Despesas Mensais</h1>
      {aviso && <p className="text-red-600 mb-4">{aviso}</p>}
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Mês</th>
            <th className="px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa, index) => (
            <tr key={index} className="bg-gray-100">
              <td className="px-4 py-2">{despesa.mes}</td>
              <td className="px-4 py-2">{despesa.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border border-gray-300 w-full max-w-lg mb-4 p-4">
        <canvas className="w-full" ref={chartRef} height={200}></canvas>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="mr-2 border border-gray-300 px-2 py-1"
          placeholder="Mês da Despesa"
          value={novoMes}
          onChange={(e) => setNovoMes(e.target.value)}
        />
        <input
          type="number"
          className="mr-2 border border-gray-300 px-2 py-1"
          placeholder="Valor da Despesa"
          value={novaDespesaValor}
          onChange={(e) => setNovaDespesaValor(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover-bg-blue-600"
          onClick={adicionarDespesa}
        >
          Adicionar Despesa
        </button>
      </div>
    </div>
  );
};

export default RelatorioDespesas;
