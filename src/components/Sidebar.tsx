import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { FaHome, FaUsers, FaMoneyBillWave } from "react-icons/fa";

interface SidebarContainerProps {
  isExpanded: boolean;
}

interface LinkTextProps {
  isExpanded: boolean;
}

const SidebarContainer = styled.nav<SidebarContainerProps>`
  background-color: ${(props) => props.theme.colors.background.paper};
  box-shadow: ${(props) => props.theme.shadows.md};
  width: ${(props) => (props.isExpanded ? "250px" : "75px")};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.md};
  transition: width 0.3s ease;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarBrand = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary.main};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SidebarLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  flex: 1;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`;

const LinkText = styled.span<LinkTextProps>`
  margin-left: ${(props) => props.theme.spacing.sm};
  display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const UserSection = styled.div`
  margin-top: auto;
  padding: ${(props) => props.theme.spacing.md};
  border-top: 1px solid ${(props) => props.theme.colors.gray[200]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const UserEmail = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #dc2626;
  }
`;

interface SidebarProps {
  onExpandChange?: (isExpanded: boolean) => void;
}

function Sidebar({ onExpandChange }: SidebarProps) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    onExpandChange?.(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent>
        <SidebarBrand to="/">
          <FaHome size={24} />
          <LinkText isExpanded={isExpanded}>CleanTrack</LinkText>
        </SidebarBrand>
        <SidebarLinks>
          <SidebarLink to="/">
            <FaHome size={20} />
            <LinkText isExpanded={isExpanded}>Dashboard</LinkText>
          </SidebarLink>
          <SidebarLink to="/clientes">
            <FaUsers size={20} />
            <LinkText isExpanded={isExpanded}>Clientes</LinkText>
          </SidebarLink>
          <SidebarLink to="/faturamento">
            <FaMoneyBillWave size={20} />
            <LinkText isExpanded={isExpanded}>Faturamento</LinkText>
          </SidebarLink>
        </SidebarLinks>
        <UserSection>
          {user && (
            <UserInfo>
              <UserEmail>{user.email}</UserEmail>
              <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </UserInfo>
          )}
        </UserSection>
      </SidebarContent>
    </SidebarContainer>
  );
}

export default Sidebar;
