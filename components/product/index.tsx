import {
  Heading,
  VStack,
  Flex,
  Image,
  Text,
  AspectRatio,
  Divider,
} from '@chakra-ui/react';

import { fullCategoryInterface } from '../../pages/product/[id]';

const ProductComponent = ({
  categoryName,
  availability,
  name,
  price,
  rating,
  imgSrc,
}: fullCategoryInterface) => {
  return (
    <>
      <Heading
        size='xl'
        w={['95%', '85%', '95%', '80%']}
        mx='auto'
        mb='4'
        textAlign='center'
        d='block'
        color='rgba(105, 143, 52, 1)'
        lineHeight='70px'
        borderBottom='1px solid rgba(68, 95, 67, 0.45)'
        fontWeight='normal'
        style={{ wordSpacing: '10px' }}
      >
        {categoryName}
      </Heading>
      <VStack mx='auto !important' w='full' maxW='550px'>
        <Flex justify='space-between' w='full'>
          <AspectRatio
            ratio={12 / 16}
            border='1px solid #445F43'
            h='full'
            py='20'
            px='4'
            w='50%'
            maxW='200px'
          >
            <Image alt='' src={`/images/products/${imgSrc}`} />
          </AspectRatio>
          {/* Product details */}
          <Flex direction='column'>
            <VStack
              spacing='5'
              align='flex-start'
              pb='10'
              borderBottom='1px solid rgba(68, 95, 67, 0.45) !important'
            >
              <Text fontSize='2xl'>{name}</Text>
              <Text fontSize='2xl' color='rgba(105, 143, 52, 1)'>
                &#8358;&nbsp;{Number(price).toFixed(2)}
              </Text>
              {/* Rating Component */}
              <Text>Availability : {availability}</Text>
            </VStack>

            {/* Quantity Component */}
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

ProductComponent.displayName = 'Product Component';
export default ProductComponent;
