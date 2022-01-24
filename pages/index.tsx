import type { NextPage } from 'next';
import Head from 'next/head';
import { VStack } from '@chakra-ui/react';
import PageWrapper from '../components/general/PageWrapper';
import MainPageHero from '../components/homepage/hero';
import FeaturedProducts from '../components/homepage/featProducts';

const Home: NextPage = () => {
  return (
    <>
      <PageWrapper hasSidebar>
        <Head>
          <title>Foodit - Your online food plug</title>
          <meta
            name='description'
            content='An one-stop online shop for fresh food.'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        {/* Main contents start here */}
        <VStack mx='auto !important'>
          <MainPageHero />
          <FeaturedProducts />
        </VStack>
      </PageWrapper>
    </>
  );
};

export default Home;
