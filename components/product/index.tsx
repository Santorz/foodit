import { AppProps } from 'next/app';
import { Heading } from '@chakra-ui/react';
import { fullCategoryInterface } from '../../pages/product/[id]';

const ProductComponent = ({}: fullCategoryInterface) => {
  return (
    <>
      <Heading>Burhh</Heading>
    </>
  );
};

ProductComponent.displayName = 'Product Component';
export default ProductComponent;
