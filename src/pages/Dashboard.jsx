import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  padding: ${(props) => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatsCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const StatsContent = styled.div`
  margin-left: ${(props) => props.theme.spacing.md};
  flex: 1;
`;

const StatsLabel = styled.dt`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: none;
`;

const StatsValue = styled.dd`
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Card>
        <Title>Dashboard</Title>
        <Subtitle>
          Bem-vindo ao sistema de gerenciamento do lava rápido
        </Subtitle>
      </Card>

      <Grid>
        {/* Card de Clientes */}
        <StatsCard>
          <IconWrapper>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </IconWrapper>
          <StatsContent>
            <StatsLabel>Total de Clientes</StatsLabel>
            <StatsValue>0</StatsValue>
          </StatsContent>
        </StatsCard>

        {/* Card de Serviços */}
        <StatsCard>
          <IconWrapper>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </IconWrapper>
          <StatsContent>
            <StatsLabel>Serviços do Mês</StatsLabel>
            <StatsValue>0</StatsValue>
          </StatsContent>
        </StatsCard>

        {/* Card de Faturamento */}
        <StatsCard>
          <IconWrapper>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </IconWrapper>
          <StatsContent>
            <StatsLabel>Faturamento Mensal</StatsLabel>
            <StatsValue>R$ 0,00</StatsValue>
          </StatsContent>
        </StatsCard>
      </Grid>
    </DashboardContainer>
  );
}

export default Dashboard;
