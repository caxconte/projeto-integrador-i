import styled from "styled-components";
import { Card } from "../../../../components/common/Card";

export const StatsCardContainer = styled(Card)`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const StatsContent = styled.div`
  margin-left: ${(props) => props.theme.spacing.md};
  flex: 1;
`;

export const StatsLabel = styled.dt`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: none;
`;

export const StatsValue = styled.dd`
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;
