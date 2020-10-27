import styled, { css } from 'styled-components';

import MetaTags from '~/components/MetaTags';

const Login = () => (
  <Container>
    <MetaTags title="Login" />

    <main>
      <h1>GoBarber 2020</h1>
    </main>
  </Container>
);

export default Login;

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${theme.colors.white};
  `}
`;
