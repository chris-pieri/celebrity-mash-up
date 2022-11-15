import styled from 'styled-components';

const Icon = styled.div`
  fill: ${({ theme }) => theme.text.main};
  height: 2.5rem;
  width: 2.5rem;

  @media (max-width: 480px) {
    height: 2rem;
    width: 2rem;
  }
`;

export default Icon;
