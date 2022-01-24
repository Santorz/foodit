import { FC } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import ProductSkeleton from '../general/ProductSkeleton';
import EachProduct from '../general/EachProduct';
import { useGetFeaturedProducts } from '../../hooks/useGetFeaturedProducts';
import { useMediaQuery } from 'react-responsive';

const FeaturedProducts: FC = () => {
  //Hooks
  const { featuredProducts, isLoading, isError } = useGetFeaturedProducts();
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  const isTabletOnly = useMediaQuery({
    query: '(min-width: 48em) and (max-width: 62em)',
  });

  // Main JSX
  return (
    <>
      {!isError && (
        <SimpleGrid
          w={{ base: '95%', lg: 'full' }}
          as='section'
          columns={{ base: 2, sm: 3, lg: 4 }}
          spacingX='20px'
          spacingY={{ base: '40px', sm: '60px' }}
          justifyContent='space-between !important'
          justifyItems='center !important'
          mt='1.5rem !important'
          mb='2rem !important'
          mx='auto'
          maxW={{ base: '575px', lg: '800px' }}
          minH='200px'
          userSelect='none'
        >
          {/* When the data is loading */}
          {isLoading && (
            <>
              <ProductSkeleton
                number={isSmartPhoneOnly ? 2 : isTabletOnly ? 3 : 4}
              />
            </>
          )}
          {/*  */}

          {/* When the data has loaded and is available */}
          {featuredProducts &&
            featuredProducts.length >= 1 &&
            featuredProducts.map((product, index) => {
              const { id: prodID } = product;

              return (
                <EachProduct
                  key={prodID + index + Math.floor(Math.random() * 1000)}
                  {...product}
                />
              );
            })}
          {/*  */}
        </SimpleGrid>
      )}
    </>
  );
};

FeaturedProducts.displayName = 'Featured Products';
export default FeaturedProducts;
