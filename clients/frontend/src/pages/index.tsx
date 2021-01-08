import Link from 'next/link';
import Image from 'next/image';
import { getBlurhash } from 'next-blurhash';
import { GetStaticProps } from 'next';

import { BlurhashCanvas } from 'react-blurhash';
import { useTheme } from 'styled-components';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import MetaTags from '~/components/MetaTags';
import Button from '~/components/Button';
import Input from '~/components/Input';
import useAuth from '~/contexts/auth';
import {
  AUTH_CONTAINER_ANIMATION,
  AUTH_HERO_ANIMATION,
  AUTH_MAIN_ANIMATION,
} from '~/constants/animations';

import GoBarberLogo from '../../public/gobarber_logo.svg';
import * as S from './_styles';

type LoginProps = {
  imgHash: string;
  imgSrc: string;
};

type FormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Preencha seu email')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'Preencha sua senha'),
});

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
  const { handleSignIn } = useAuth();

  const formMethods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = formMethods;

  return (
    <S.Container {...AUTH_CONTAINER_ANIMATION}>
      <MetaTags title="Login" />

      <S.AnimatedMain {...AUTH_MAIN_ANIMATION('right')}>
        <header>
          <h1>
            <GoBarberLogo />
          </h1>
        </header>

        <FormProvider {...formMethods}>
          <S.Form onSubmit={handleSubmit(handleSignIn)}>
            <strong>Faça seu login</strong>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
              required
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
              required
            />

            <Button type="submit">Entrar</Button>

            <span>Esqueceu sua senha?</span>
          </S.Form>
        </FormProvider>

        <footer>
          <Link href="/sign-up">
            <a>
              <FiLogIn color={colors.orange} /> Criar conta
            </a>
          </Link>
        </footer>
      </S.AnimatedMain>

      <S.ImageWrapper {...AUTH_HERO_ANIMATION('right')}>
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
