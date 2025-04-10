import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções para Clientes
export const adicionarCliente = async (cliente) => {
  try {
    const { data, error } = await supabase
      .from("clientes")
      .insert([
        {
          ...cliente,
          data_cadastro: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    throw error;
  }
};

export const buscarClientes = async () => {
  try {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("data_cadastro", { ascending: false });

    if (error) throw error;
    return data.map((cliente) => ({
      ...cliente,
      dataCadastro: new Date(cliente.data_cadastro).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// Funções para Serviços/Faturamento
export const registrarServico = async (servico) => {
  try {
    const { data, error } = await supabase
      .from("servicos")
      .insert([
        {
          ...servico,
          data: new Date().toISOString(),
          valor: Number(servico.valor),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Erro ao registrar serviço:", error);
    throw error;
  }
};

export const buscarServicos = async () => {
  try {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .order("data", { ascending: false });

    if (error) throw error;
    return data.map((servico) => ({
      ...servico,
      data: new Date(servico.data).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    throw error;
  }
};

export const calcularFaturamentoMensal = async () => {
  try {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const fimMes = new Date();
    fimMes.setMonth(fimMes.getMonth() + 1);
    fimMes.setDate(0);
    fimMes.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from("servicos")
      .select("valor")
      .gte("data", inicioMes.toISOString())
      .lte("data", fimMes.toISOString());

    if (error) throw error;

    const total = data.reduce((acc, servico) => acc + servico.valor, 0);
    return total;
  } catch (error) {
    console.error("Erro ao calcular faturamento:", error);
    throw error;
  }
};
