import styled from 'styled-components';

const Icon = styled.div`
  fill: ${({ theme, disabled }) => (disabled ? theme.text.disabled : theme.text.main)};
  height: 2rem;
  width: 2rem;
`;

export default Icon;
