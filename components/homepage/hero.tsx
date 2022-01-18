import { FC } from 'react';
import { Box, Image, AspectRatio } from '@chakra-ui/react';

const Hero: FC = () => {
  return (
    <Box as='section' p='0' mx='auto !important' position='relative'>
      <AspectRatio
        ratio={22 / 10}
        w='full'
        maxW={{ base: '700px', lg: '800px' }}
        mx='auto !important'
        _before={{ padding: '0 !important' }}
        h={{ base: '16.5rem', md: 'inherit' }}
      >
        <Image
          onContextMenu={(e) => e.preventDefault()}
          src='/images/homehero.svg'
          alt=''
          objectFit='cover'
          style={{ position: 'relative' }}
        />
      </AspectRatio>
    </Box>
  );
};

export default Hero;
