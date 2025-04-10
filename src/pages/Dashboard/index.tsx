import React from "react";
import { Card } from "../../components/common/Card";
import { Title, Subtitle } from "../../components/common/Typography";
import { Grid } from "../../components/common/Layout";
import { StatsCard } from "./components/StatsCard";
import { UsersIcon, ClipboardIcon, CurrencyIcon } from "./components/Icons";

function Dashboard() {
  return (
    <div>
      <Card>
        <Title>Dashboard</Title>
        <Subtitle>Bem-vindo ao seu sistema de gerenciamento!</Subtitle>
      </Card>

      <Grid>
        <StatsCard icon={<UsersIcon />} label="Total de Clientes" value="0" />

        <StatsCard icon={<ClipboardIcon />} label="Serviços do Mês" value="0" />

        <StatsCard
          icon={<CurrencyIcon />}
          label="Faturamento Mensal"
          value="R$ 0,00"
        />
      </Grid>
    </div>
  );
}

export default Dashboard;
