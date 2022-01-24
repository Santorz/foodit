import { FC } from 'react';
import { Skeleton } from '@chakra-ui/react';

interface LoaderInterface {
  number: number;
}
const ProductSkeleton: FC<LoaderInterface> = ({ children, ...props }) => {
  const { number } = props;
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} height='270px' w='full' rounded='none' />
        ))}
    </>
  );
};

export default ProductSkeleton;
