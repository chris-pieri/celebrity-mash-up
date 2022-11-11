import styled from 'styled-components';

const Input = styled.input`
  padding: 1rem 10px;
  font-size: 1rem;
  border: 1px solid;
  font-family: inherit;
  color: ${({ theme }) => theme.text.main};
  background-color: ${({ theme }) => theme.background.main};
  border-color: ${({ theme }) => theme.background.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.primary.main};
  }

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline-color: ${({ theme }) => theme.secondary.main};
  }
`;

export default Input;
