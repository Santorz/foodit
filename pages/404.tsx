import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../components/general/PageWrapper';
import { Heading } from '@chakra-ui/react';

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - foodit</title>
      </Head>
      {/* Make sure you include hasSidebar prop for pages that do have sidebar */}
      <PageWrapper hasSidebar>
        <Heading size='xl' textAlign='center' px='2' fontWeight='normal'>
          Oops... <br /> We {`couldn't`} find that page bruh.
        </Heading>
      </PageWrapper>
    </>
  );
};

export default ErrorPage;
