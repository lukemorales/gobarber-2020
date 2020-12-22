import Link from 'next/link';
import Image from 'next/image';
import { getBlurhash } from 'next-blurhash';
import { GetStaticProps } from 'next';

import { BlurhashCanvas } from 'react-blurhash';
import { useTheme } from 'styled-components';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as S from './_styles';
import GoBarberLogo from '../../public/gobarber_logo.svg';

import MetaTags from '~/components/MetaTags';
import Button from '~/components/Button';
import Input from '~/components/Input';

type LoginProps = {
  imgHash: string;
  imgSrc: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Preencha seu nome completo'),
  email: Yup.string()
    .required('Preencha seu email')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

export const getStaticProps: GetStaticProps = async () => {
  const imgSrc = '/bg_signup.png';
  const imgHash = await getBlurhash(imgSrc);

  return {
    props: {
      imgHash,
      imgSrc,
    },
  };
};

const SignUp = ({ imgHash, imgSrc }: LoginProps) => {
  const { colors } = useTheme();

  const formMethods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = formMethods;

  const handleFormData = (data: FormData) => {
    console.log({ data });
  };

  return (
    <S.Container>
      <MetaTags title="Cadastro" />

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

      <main>
        <header>
          <h1>
            <GoBarberLogo />
          </h1>
        </header>
        <FormProvider {...formMethods}>
          <S.Form onSubmit={handleSubmit(handleFormData)}>
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </S.Form>
        </FormProvider>

        <footer>
          <Link href="/">
            <a>
              <FiArrowLeft color={colors.orange} /> Voltar para o Login
            </a>
          </Link>
        </footer>
      </main>
    </S.Container>
  );
};

export default SignUp;
