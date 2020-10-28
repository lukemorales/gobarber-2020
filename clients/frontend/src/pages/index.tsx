import Link from 'next/link';

import styled, { css, useTheme } from 'styled-components';
import { FiLogIn } from 'react-icons/fi';

import GoBarberLogo from '../../public/gobarber_logo.svg';

import MetaTags from '~/components/MetaTags';
import Button from '~/components/Button';

const Login = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <MetaTags title="Login" />

      <main>
        <header>
          <h1>
            <GoBarberLogo />
          </h1>
        </header>

        <Form>
          <strong>Faça seu login</strong>

          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <span>Esqueceu sua senha?</span>
        </Form>

        <footer>
          <Link href="/sign-up">
            <a>
              <FiLogIn color={colors.orange} /> Criar conta
            </a>
          </Link>
        </footer>
      </main>

      <img
        src="/bg_login.png"
        width={1421}
        height="auto"
        alt="GoBarber 2020"
        loading="eager"
      />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-areas: 'form image';
    grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
    height: 100%;
    color: ${theme.colors.white};

    > main {
      grid-area: form;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > header svg {
        width: 24rem;
        height: auto;
      }

      > footer {
        margin-top: 8rem;

        > a {
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.orange};

          > svg {
            margin-right: 1.6rem;
          }
        }
      }
    }

    > img {
      grid-area: image;
      object-fit: cover;
      width: 100%;
      height: 100%;
      mix-blend-mode: hard-light;
      opacity: 0.8;
    }
  `}
`;

const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8rem;

    > strong {
      font-size: 2.4rem;
      margin-bottom: 2.4rem;
    }

    > input {
      padding: 1.6rem;
      width: 34rem;
      border-radius: ${theme.radii.default};
      background: ${theme.colors.inputs};
      color: ${theme.colors.white};

      ::placeholder {
        color: ${theme.colors.grayHard};
      }

      + input {
        margin-top: 0.8rem;
      }

      :last-of-type {
        margin-bottom: 2.4rem;
      }
    }

    > button + span {
      margin-top: 2.4rem;
    }
  `}
`;
