import styled from "styled-components";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  hide?: string,
};

export const Input = styled.input<InputProps>`
background-image: linear-gradient(#1C76E2, #1C76E2), linear-gradient(#bfbfbf, #bfbfbf);
border: 0 none;
border-radius: 0;
box-shadow: none;
float: none;
background-color: transparent;
background-position: center bottom, center calc(100% - 1px);
background-repeat: no-repeat;
background-size: 0 2px, 100% ${props => props.hide ? '0px' : '1px'};
padding: 0;
margin-left: 15px;
transition: background 0s ease-out 0s;
color: #414141;
min-height: 35px;
display: initial;
width: 16rem;
outline: none;
font-size: 15px;
&:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: #525252;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;
`
