import { FC } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';

interface ProductInterface {
  prodID: number;
  name: string;
  price: number;
  priority: number;
}

// Main Component
const EachProduct: FC<ProductInterface> = ({ ...props }, children) => {
  const { prodID, name, price } = props;

  //   Main JSX
  return (
    <Box
      as='article'
      h='270px'
      border='1px solid #445F43'
      w='full'
      d='flex'
      flexDir='column'
      alignItems='center'
    >
      <Image
        alt={name}
        src='/images/products/garri-1.svg'
        h='119.7px'
        w='55.73%'
        mt='15.3px'
        onContextMenu={(e) => e.preventDefault()}
      />
      <Box as='section' textAlign='left'>
        <h2>{name}</h2>
        <h2>&#8358;&nbsp;{price.toFixed(2)}</h2>
      </Box>
      <Button
        w='full'
        alignSelf='end'
        rounded='none'
        mt='auto'
        bgGradient='linear(93.39deg, #7BCA79 0.23%, #CFEACE 130.69%);'
        _hover={{
          background:
            'linear-gradient(93.39deg, #59BC57 0.23%, #B8E0B7 130.69%) !important',
        }}
        _focus={{
          background:
            'linear-gradient(93.39deg, #59BC57 0.23%, #B8E0B7 130.69%) !important',
        }}
      >
        Add to cart
      </Button>
    </Box>
  );
};

EachProduct.displayName = 'EachProduct';
export default EachProduct;
