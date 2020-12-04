import Link from 'next/link';
import { FormEvent } from 'react';
import Image from 'next/image';
import { getBlurhash } from 'next-blurhash';
import { GetStaticProps } from 'next';

import { BlurhashCanvas } from 'react-blurhash';
import { useTheme } from 'styled-components';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import * as S from './_styles';
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
    <S.Container>
      <MetaTags title="Login" />

      <main>
        <header>
          <h1>
            <GoBarberLogo />
          </h1>
        </header>

        <S.Form onSubmit={handleSubmit}>
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
        </S.Form>

        <footer>
          <Link href="/sign-up">
            <a>
              <FiLogIn color={colors.orange} /> Criar conta
            </a>
          </Link>
        </footer>
      </main>

      <S.ImageWrapper>
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
        <Image src={imgSrc} layout="fill" alt="GoBarber 2020" />
      </S.ImageWrapper>
    </S.Container>
  );
};

export default Login;
