import { FC, useRef, useState, useEffect } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';
import Link from 'next/link';

interface ProductInterface {
  prodID: number;
  name: string;
  price: number;
  priority: number;
  imgSrc: string;
}
type BtnHeightType = number | undefined;

// Main Component
const EachProduct: FC<ProductInterface> = (props) => {
  const { prodID, name, price, imgSrc } = props;
  // State values
  const [btnHeight, setBtnHeight] = useState<BtnHeightType>(0);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // useEffects
  useEffect(() => {
    setBtnHeight(buttonRef.current?.clientHeight);
  }, [buttonRef]);

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
      <Link href={`/product/${prodID}`} passHref>
        <a
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: `calc(100% - ${btnHeight}px)`,
            borderRadius: 'none !important',
          }}
        >
          <Image
            alt={name}
            src={`/images/products/${imgSrc}`}
            h='119.7px'
            w='55.73%'
            mt='15.3px'
            onContextMenu={(e) => e.preventDefault()}
          />
          <Box as='section' textAlign='left'>
            <h2>{name}</h2>
            <h2>&#8358;&nbsp;{price.toFixed(2)}</h2>
          </Box>
        </a>
      </Link>

      <Button
        w='full'
        alignSelf='end'
        rounded='none'
        ref={buttonRef}
        bgGradient='linear(93.39deg, #7BCA79 0.23%, #CFEACE 130.69%);'
        _hover={{
          background:
            'linear-gradient(93.39deg, #59BC57 0.23%, #B8E0B7 130.69%) !important',
          border: '1px solid black !important',
        }}
        _focus={{
          background:
            'linear-gradient(93.39deg, #59BC57 0.23%, #B8E0B7 130.69%) !important',
          border: '1px solid black !important',
        }}
      >
        Add to cart
      </Button>
    </Box>
  );
};

EachProduct.displayName = 'EachProduct';
export default EachProduct;
