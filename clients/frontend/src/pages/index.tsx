import Link from 'next/link';
import { FormEvent } from 'react';
import Image from 'next/image';
import { getBlurhash } from 'next-blurhash';
import { GetStaticProps } from 'next';

import { BlurhashCanvas } from 'react-blurhash';
import styled, { css, useTheme } from 'styled-components';
import { tint, shade } from 'polished';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import GoBarberLogo from '../../public/gobarber_logo.svg';

import MetaTags from '~/components/MetaTags';
import Button from '~/components/Button';
import Input from '~/components/Input';

type LoginProps = {
  imgHash: string;
  imgSrc: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const imgSrc = '/bg_login.png';
  const imgHash = await getBlurhash(imgSrc);

  return {
    props: {
      imgHash,
      imgSrc,
    },
  };
};

const Login = ({ imgHash, imgSrc }: LoginProps) => {
  const { colors } = useTheme();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <MetaTags title="Login" />

      <main>
        <header>
          <h1>
            <GoBarberLogo />
          </h1>
        </header>

        <Form onSubmit={handleSubmit}>
          <strong>Faça seu login</strong>

          <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />

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

      <ImageWrapper>
        <BlurhashCanvas
          hash={imgHash}
          // getBlurhash **always** returns 32×32 dimensions
          width={64}
          height={64}
          punch={1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <Image src={imgSrc} width={1920} height={1080} alt="GoBarber 2020" />
      </ImageWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    color: ${theme.colors.white};

    > main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto;

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
          border-bottom: 1px solid transparent;

          :hover {
            color: ${tint(0.13, theme.colors.orange)};
            border-bottom-color: ${tint(0.13, theme.colors.orange)};
            text-decoration: none;
          }

          :active {
            color: ${shade(0.13, theme.colors.orange)};
          }

          > svg {
            margin-right: 1.6rem;
          }
        }
      }
    }
  `}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 100%;

  canvas {
    mix-blend-mode: color-burn;
    opacity: 0.2;
  }

  div {
    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      mix-blend-mode: color-burn;
      opacity: 0.8;
    }
  }
`;

const Form = styled.form`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8rem;

    > strong {
      font-size: 2.4rem;
      margin-bottom: 2.4rem;
    }

    > label {
      :last-of-type {
        margin-bottom: 2.4rem;
      }
    }

    > button + span {
      margin-top: 2.4rem;
    }
  `}
`;
