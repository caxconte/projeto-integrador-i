# Sistema de Gerenciamento de Lava Rápido

Sistema desenvolvido para gerenciamento de clientes e faturamento de uma empresa de lava rápido.

## 🚀 Tecnologias Utilizadas

### Front-end

- React.js
- React Router
- React Hook Form
- Axios
- TailwindCSS
- Supabase Authentication

### Back-end

- Node.js
- Express.js
- Supabase Firestore
- Supabase Storage

## 📋 Funcionalidades

### Módulo Clientes

- Cadastro, edição e exclusão de clientes
- Lista de clientes com busca
- Histórico de atendimentos

### Módulo Faturamento

- Registro de serviços realizados
- Geração de relatório mensal
- Total faturado por cliente

### Outros

- Painel de dashboard com estatísticas
- Sistema de autenticação
- Interface responsiva

## 🛠️ Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as credenciais do Firebase

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Integração com Firebase e API
├── hooks/         # Custom hooks
├── utils/         # Funções utilitárias
└── App.jsx        # Componente principal
```

## 🔒 Segurança

- Autenticação via Firebase
- Proteção de rotas
- Validação de formulários
- Sanitização de dados
