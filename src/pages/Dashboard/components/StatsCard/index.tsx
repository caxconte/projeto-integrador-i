import React from "react";

import {
  StatsCardContainer,
  IconWrapper,
  StatsContent,
  StatsLabel,
  StatsValue,
} from "./styles";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <StatsCardContainer>
      <IconWrapper>{icon}</IconWrapper>
      <StatsContent>
        <StatsLabel>{label}</StatsLabel>
        <StatsValue>{value}</StatsValue>
      </StatsContent>
    </StatsCardContainer>
  );
}
