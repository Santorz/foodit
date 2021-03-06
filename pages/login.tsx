import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { emailRegex, passwordRegex } from '../funcs/regexValidator';
import Head from 'next/head';
import PageWrapper from '../components/general/PageWrapper';
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Box,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

// Main Component
const LoginPage: NextPage = () => {
  //   Main JSX
  return (
    <>
      <Head>
        <title>Login | foodit</title>
      </Head>

      <PageWrapper style={{ userSelect: 'none' }}>
        <Box mx='auto !important' maxW='550px' w='full' px='4'>
          <Heading
            mb='12'
            color='#445F43'
            size='lg'
            textAlign='center'
            fontWeight='normal'
            style={{ wordSpacing: '11px' }}
          >
            WELCOME BACK DEAR
          </Heading>

          {/* Main login form */}
          <LoginForm />
        </Box>
      </PageWrapper>
    </>
  );
};

// Form Component, Interface, etc
interface FormDataInterface {
  email: string | '';
  password: string | '';
}
const initialFormData: FormDataInterface = {
  email: '',
  password: '',
};

const logUserIn = async (email: string, password: string) => {
  const request = await axios.get(
    `http://192.168.8.107:8080/users?email=${email}&password=${encodeURIComponent(
      password
    )}`
  );
  return request;
};

// Main Component
const LoginForm: FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email, password } = formData;
  const toast = useToast();
  const router = useRouter();

  // Variables
  const isEmailError: boolean = email === '' || !email.match(emailRegex);
  const isPasswordError: boolean =
    password === '' || !password.match(passwordRegex);

  // Funcs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target! as HTMLInputElement;
    setFormData({ ...formData, [target.name.trim()]: target.value.trim() });
  };
  type toaststatustype = 'error' | 'info' | 'warning' | 'success' | undefined;
  const showToast = (
    status: toaststatustype,
    message?: string,
    isError?: boolean
  ) => {
    toast({
      title: `${
        status ? status.toString().toUpperCase() : isError ? 'ERROR' : undefined
      }`,
      status: status ? status : isError ? 'error' : undefined,
      position: 'top-right',
      isClosable: true,
      duration: 5000,
      description:
        status === 'error' && !message
          ? 'Invalid username or password'
          : status === 'warning' && !message
          ? 'One input field is either empty or has invalid content'
          : status === 'success' && !message
          ? `You've successfully logged in.`
          : status === undefined && message
          ? message
          : undefined,
    });
    setIsSubmitting(false);
  };

  // Main submission func
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailError && !isPasswordError) {
      setIsSubmitting(true);
      try {
        const responseArr = await logUserIn(email, password);
        if (responseArr.data.length > 0) {
          const { id, email, password, name, isLoggedIn, cart } =
            responseArr.data[0];
          const objToSet = {
            id: id,
            email: email,
            password: '********',
            name: name,
            isLoggedIn: true,
            cart: cart,
          };
          localStorage.setItem('fooditUser', JSON.stringify(objToSet));
          showToast('success');
          router.push('/');
        } else {
          showToast('error');
        }
      } catch (err: AxiosError | any) {
        showToast(undefined, err.message.toString(), true);
      }
    } else {
      showToast('warning');
    }
  };

  //   Main JSX
  return (
    <form onSubmit={handleSubmit}>
      <VStack mx='auto' spacing={{ base: '7', sm: '10' }}>
        {/* Email field */}
        <FormControl isRequired isInvalid={isEmailError}>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            id='email'
            name='email'
            type='email'
            value={email}
            border='1px solid rgba(68, 95, 67, 0.63) !important'
            rounded='none !important'
            bgColor='white !important'
            onChange={handleChange}
            _autofill={{ boxShadow: '0 0 0 30px white inset !important' }}
          />
          {isEmailError && email === '' ? (
            <FormErrorMessage>Empty email field</FormErrorMessage>
          ) : isEmailError && email !== '' ? (
            <FormErrorMessage>Invalid email address</FormErrorMessage>
          ) : (
            ''
          )}
        </FormControl>

        {/* Password field */}
        <FormControl isRequired isInvalid={isPasswordError}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            id='password'
            name='password'
            type='password'
            value={password}
            border='1px solid rgba(68, 95, 67, 0.63) !important'
            rounded='none !important'
            bgColor='white !important'
            onChange={handleChange}
            _autofill={{ boxShadow: '0 0 0 30px white inset !important' }}
          />
          {isPasswordError && password === '' ? (
            <FormErrorMessage>Empty password field</FormErrorMessage>
          ) : isPasswordError && password !== '' ? (
            <FormErrorMessage>Invalid password format</FormErrorMessage>
          ) : (
            ''
          )}
        </FormControl>

        {/* Submit button */}
        <Button
          disabled={isEmailError || isPasswordError}
          border=' 1px solid rgba(68, 95, 67, 0.63)'
          rounded='none'
          w='full'
          mt='4.5rem !important'
          type='submit'
          d='flex'
          alignItems='center'
          bg='#445F43'
          color='white'
          fontSize='17.5px'
          _hover={{
            background: '#2C3D2C !important',
            border: '2px solid black !important',
            transition: 'all .1s !important',
            boxShadow: '0 0 7px .1px gray',
          }}
          _focus={{
            background: '#2C3D2C !important',
            border: '2px solid black !important',
            transition: 'all .1s !important',
            boxShadow: '0 0 7px .1px gray',
          }}
          isLoading={isSubmitting}
        >
          <AddIcon mx='2' py='0.5' />
          Login and Continue
        </Button>
        {/*  */}
      </VStack>
    </form>
  );
};

export default LoginPage;
