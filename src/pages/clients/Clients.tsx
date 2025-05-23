import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Modal } from "react-bootstrap";
import { RegisterClientModal } from "../../components/modals/RegisterClientModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Search } from "../../components/common/Search";
import { useRegisterClient } from "../../hooks/useRegisterClient";
import { useClients } from "../../hooks/useClients";

interface ClientsProps {
  isHomepage?: boolean;
}

export const Clients: React.FC<ClientsProps> = ({ isHomepage }) => {
  const { user } = useAuth();
  const {
    fetchClients,
    clients,
    clienteExcluindo,
    setClienteExcluindo,
    loading,
    currentPage,
    setCurrentPage,
    totalClients,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    deleteClient,
  } = useClients();

  const {
    showModal,
    clienteEditando,
    openRegisterClientModal,
    closeRegisterClientModal,
  } = useRegisterClient();

  const totalPages = Math.ceil(totalClients / 10);

  return (
    <div style={{ backgroundColor: "#ddeeff", minHeight: "100vh" }}>
      {user && <Sidebar />}

      <div
        className={!isHomepage ? "container-fluid py-4" : ""}
        style={
          isHomepage
            ? { paddingLeft: 80, paddingRight: "60px" }
            : {
                paddingLeft: 260,
                transition: "margin-left 0.3s ease",
                paddingRight: "60px",
              }
        }
      >
        {!isHomepage && (
          <h5 className="mb-4">
            Olá {user?.user_metadata?.name || "Usuário"} 👋
          </h5>
        )}

        <div
          className="container p-4"
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            {!isHomepage ? (
              <>
                <h5 className="mb-3">Todos os Clientes</h5>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => openRegisterClientModal()}
                  >
                    Cadastrar Novo Cliente
                  </button>
                  <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </div>
              </>
            ) : (
              <>
                <h5>Todos os Clientes </h5>

                <Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              </>
            )}
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nome do Cliente</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Carro</th>
                  <th>Placa</th>
                  {!isHomepage ? <th>Ações</th> : null}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Carregando...
                    </td>
                  </tr>
                )}

                {!loading && clients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                )}

                {!loading &&
                  clients.map((client, index) => (
                    <tr key={index}>
                      <td>{client.nome}</td>
                      <td>{client.tel1}</td>
                      <td>{client.mail}</td>
                      <td>{client.carros?.[0]?.modelo || "—"}</td>
                      <td>{client.carros?.[0]?.placas?.placa || "—"}</td>
                      {!isHomepage ? (
                        <td className="d-flex gap-2 justify-content-evenly">
                          <FaEdit
                            style={{ cursor: "pointer", color: "#6C2BD9" }}
                            onClick={() => openRegisterClientModal(client)}
                          />
                          <FaTrash
                            style={{ cursor: "pointer", color: "#D9534F" }}
                            onClick={() => setClienteExcluindo(client)}
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <small>
              Mostrando {clients.length} de {totalClients} cadastros encontrados
            </small>
            {totalPages > 1 && (
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      role="button"
                    >
                      ‹
                    </span>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <span
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                        role="button"
                      >
                        {i + 1}
                      </span>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      role="button"
                    >
                      ›
                    </span>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <RegisterClientModal
          show={showModal}
          onHide={closeRegisterClientModal}
          onSuccess={() => fetchClients(currentPage, searchTerm)}
          clienteEditando={clienteEditando}
        />
      )}

      <Modal
        show={!!clienteExcluindo}
        onHide={() => setClienteExcluindo(null)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja remover o cliente
          <strong>{clienteExcluindo?.nome}</strong>? Esta ação não poderá ser
          desfeita.
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setClienteExcluindo(null)}
          >
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={deleteClient}>
            Confirmar Remoção
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
