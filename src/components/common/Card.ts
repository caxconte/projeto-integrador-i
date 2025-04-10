import styled from "styled-components";

export const Card = styled.div<{ theme: any }>`
  background-color: ${(props) =>
    props.theme?.colors?.background?.paper || "#fff"};
  border-radius: ${(props) => props.theme?.borderRadius?.lg || "8px"};
  box-shadow: ${(props) =>
    props.theme?.shadows?.sm || "0 1px 3px rgba(0,0,0,0.12)"};
  padding: ${(props) => props.theme?.spacing?.lg || "16px"};
`;
