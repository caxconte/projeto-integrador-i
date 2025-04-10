import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Faturamento from "./pages/Faturamento";
import Sidebar from "./components/Sidebar";

// Components
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/clientes"
                  element={
                    <PrivateRoute>
                      <Clientes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/faturamento"
                  element={
                    <PrivateRoute>
                      <Faturamento />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
