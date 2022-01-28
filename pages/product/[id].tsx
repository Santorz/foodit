import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios, { AxiosError } from 'axios';

import PageWrapper from '../../components/general/PageWrapper';
import ProductComponent from '../../components/product';
import { Heading, Text } from '@chakra-ui/react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  let apiRes;
  try {
    apiRes = await axios.get(`http://192.168.8.103:8080/products/${id}`);
  } catch (err: AxiosError | any) {
    apiRes = err.response.status;
  }

  //
  return {
    props: {
      data: typeof apiRes === 'object' ? apiRes!.data : apiRes!,
    },
  };
};

// Global Vars and Funcs
export interface fullCategoryInterface {
  name: string | '';
}
const initialCategory = {
  name: '',
};

const ProductPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // Props
  const { data } = props;
  const { id: productID, category: productCategoryNum } = data || {};

  // useStates
  const [category, setCategory] =
    useState<fullCategoryInterface>(initialCategory);

  // useEffects
  useEffect(() => {
    axios
      .get(`http://192.168.8.103:8080/categories/${productCategoryNum}`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => setCategory(initialCategory));
  }, [productCategoryNum]);

  const { name: categoryName } = category!;

  return (
    <>
      <PageWrapper hasSidebar>
        {typeof data === 'object' && <ProductComponent {...category} />}
        {typeof data !== 'object' && <Text fontSize='7xl'>{data}</Text>}
      </PageWrapper>
    </>
  );
};

export default ProductPage;
