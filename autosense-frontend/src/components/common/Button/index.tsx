import styled from "styled-components";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  primary?: string,
  warning?: string,
  danger?: string,
  dark?: string,
}

export const Button = styled.button<ButtonProps>`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  border: none;
  border-radius: 0.3rem;
  padding: 0.8rem 2rem;
  font-size: 16px;
  cursor: pointer;
  color: white;
  ${props => props.primary && 'background-color: #1C76E2;'}
  ${props => props.warning && 'background-color: #e2b51c;'}
  ${props => props.danger && 'background-color: #e21c1c;'}
  ${props => props.dark && 'background-color: #000000;'}
  box-shadow: 0 0 4px #999;
  outline: none;
  background-position: center;
  transition: background 0.8s;
  margin-left: .7rem;

  &:hover {
    background: #2196f3 radial-gradient(circle, transparent 1%, #2196f3 1%) center/15000%;
  }

  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`