import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DivisaoSalario = ({ salario }) => {
  const chartRef = useRef(null);
  let myChart = useRef(null);

  useEffect(() => {
    if (chartRef.current && myChart.current !== null) {
      myChart.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const salario50 = salario * 0.5;
    const contas = salario50 * 0.5;
    const guardar = salario50 * 0.25;
    const investimentos = salario50 * 0.3;
    const lazer = salario50 * 0.2;

    const data = {
      labels: ['Guardar', 'Investimentos', 'Lazer', 'Contas'],
      datasets: [
        {
          data: [guardar, investimentos, lazer, contas],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    myChart.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
    });
  }, [salario]);

  return (
    <div className="border border-gray-300 w-full max-w-lg mb-4 p-4">
      <canvas className="w-full" ref={chartRef} height={200}></canvas>
    </div>
  );
};

const DivisaoSalarioPagina = () => {
  const [salarioAtual, setSalarioAtual] = useState(3000);
  const [novoSalario, setNovoSalario] = useState('');

  const [valoresDivisao, setValoresDivisao] = useState({
    guardar: 0,
    investimentos: 0,
    lazer: 0,
    contas: 0,
  });

  const handleAdicionarSalario = () => {
    const novoSalarioNum = parseFloat(novoSalario);
    if (!isNaN(novoSalarioNum) && novoSalarioNum > 0) {
      setSalarioAtual(novoSalarioNum);
      setNovoSalario('');
    } else {
      alert('Por favor, insira um valor de salário válido.');
    }
  };

  useEffect(() => {
    const salario50 = salarioAtual * 0.50;
    const contas = salario50 * 0.35;
    const guardar = salario50 * 0.2;
    const investimentos = salario50 * 0.25;
    const lazer = salario50 * 0.15;

    setValoresDivisao({
      guardar: guardar,
      investimentos: investimentos,
      lazer: lazer,
      contas: contas,
    });
  }, [salarioAtual]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Divisão do Salário</h1>
      <DivisaoSalario salario={salarioAtual} />
      <div className="mt-4 flex items-center">
        <input
          type="number"
          placeholder="Novo Salário"
          value={novoSalario}
          onChange={(e) => setNovoSalario(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleAdicionarSalario}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Adicionar Salário
        </button>
      </div>
      <div className="mt-8 w-full max-w-md bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Relatório de Divisão de Salário:</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm">Guardar:</p>
            <p className="text-lg font-semibold text-blue-500">
              R${valoresDivisao.guardar.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm">Investimentos:</p>
            <p className="text-lg font-semibold text-yellow-500">
              R${valoresDivisao.investimentos.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm">Lazer:</p>
            <p className="text-lg font-semibold text-green-500">
              R${valoresDivisao.lazer.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm">Contas:</p>
            <p className="text-lg font-semibold text-red-500">
              R${valoresDivisao.contas.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisaoSalarioPagina;
