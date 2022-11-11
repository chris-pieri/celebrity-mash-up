import styled from 'styled-components';

const Input = styled.input`
  padding: 1rem 10px;
  font-size: 1rem;
  border: 1px solid;
  font-family: inherit;
  background-color: ${({ theme }) => theme.background.main};
  border-color: ${({ theme }) => theme.background.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.primary.main};
  }

  &:focus {
    outline: ${({ theme }) => theme.secondary.main} solid 1px;
  }
`;

export default Input;
