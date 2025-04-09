import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Faturamento() {
  const [servicos, setServicos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const novoServico = {
      id: Date.now(),
      ...data,
      data: new Date().toLocaleDateString(),
      valor: parseFloat(data.valor),
    };
    setServicos([...servicos, novoServico]);
    reset();
    setShowForm(false);
  };

  const calcularTotal = () => {
    return servicos
      .reduce((total, servico) => total + servico.valor, 0)
      .toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Faturamento</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
          >
            {showForm ? "Cancelar" : "Novo Serviço"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="cliente"
                className="block text-sm font-medium text-gray-700"
              >
                Cliente
              </label>
              <input
                {...register("cliente", { required: "Cliente é obrigatório" })}
                type="text"
                id="cliente"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              {errors.cliente && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cliente.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="servico"
                className="block text-sm font-medium text-gray-700"
              >
                Serviço
              </label>
              <select
                {...register("servico", { required: "Serviço é obrigatório" })}
                id="servico"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Selecione um serviço</option>
                <option value="Lavagem Simples">Lavagem Simples</option>
                <option value="Lavagem Completa">Lavagem Completa</option>
                <option value="Polimento">Polimento</option>
                <option value="Higienização">Higienização</option>
              </select>
              {errors.servico && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.servico.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="valor"
                className="block text-sm font-medium text-gray-700"
              >
                Valor
              </label>
              <input
                {...register("valor", {
                  required: "Valor é obrigatório",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Valor inválido",
                  },
                })}
                type="text"
                id="valor"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="0.00"
              />
              {errors.valor && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.valor.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Resumo</h2>
          <div className="text-2xl font-bold text-primary-600">
            Total: R$ {calcularTotal()}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicos.map((servico) => (
                <tr key={servico.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {servico.data}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {servico.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {servico.servico}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {servico.valor.toFixed(2)}
                  </td>
                </tr>
              ))}
              {servicos.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Nenhum serviço registrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Faturamento;
