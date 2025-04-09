import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funções para Clientes
export const adicionarCliente = async (cliente) => {
  try {
    const docRef = await addDoc(collection(db, "clientes"), {
      ...cliente,
      dataCadastro: new Date().toISOString(),
    });
    return { id: docRef.id, ...cliente };
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    throw error;
  }
};

export const buscarClientes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataCadastro: new Date(doc.data().dataCadastro).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// Funções para Serviços/Faturamento
export const registrarServico = async (servico) => {
  try {
    const docRef = await addDoc(collection(db, "servicos"), {
      ...servico,
      data: new Date().toISOString(),
      valor: Number(servico.valor),
    });
    return { id: docRef.id, ...servico };
  } catch (error) {
    console.error("Erro ao registrar serviço:", error);
    throw error;
  }
};

export const buscarServicos = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "servicos"), orderBy("data", "desc"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      data: new Date(doc.data().data).toLocaleDateString(),
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

    const querySnapshot = await getDocs(
      query(
        collection(db, "servicos"),
        where("data", ">=", inicioMes.toISOString()),
        where("data", "<=", fimMes.toISOString())
      )
    );

    const total = querySnapshot.docs.reduce(
      (acc, doc) => acc + doc.data().valor,
      0
    );

    return total;
  } catch (error) {
    console.error("Erro ao calcular faturamento:", error);
    throw error;
  }
};
