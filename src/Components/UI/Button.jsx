import styled from 'styled-components';

const Button = styled.button`
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.text.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.background.dark};
  transition: border-color 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.primary.main};
  }

  &:focus,
  &:focus-visible {
    outline: ${({ theme }) => theme.secondary.main} solid 1px;
  }
`;

export default Button;
