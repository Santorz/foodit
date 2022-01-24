import { FC } from 'react';
import { Box, Image, AspectRatio, Heading } from '@chakra-ui/react';

const Hero: FC = () => {
  return (
    <Box
      as='main'
      p='0'
      mx='auto !important'
      position='relative'
      userSelect='none'
    >
      <AspectRatio
        ratio={22 / 10}
        w='full'
        maxW={{ base: '575px', lg: '800px' }}
        mx='auto !important'
        _before={{ padding: '0 !important' }}
        h={{ base: '16.5rem', md: 'inherit' }}
        position='relative'
      >
        <>
          <Image
            onContextMenu={(e) => e.preventDefault()}
            src='/images/homehero.svg'
            alt=''
            objectFit='cover'
            style={{ position: 'relative' }}
          />
        </>
      </AspectRatio>

      <Heading
        size='xl'
        w={['95%', 'full', '95%', 'full']}
        mx='auto'
        textAlign='center'
        d='block'
        color='#445F43'
        lineHeight='70px'
        borderBottom='1px solid #445F43'
        fontWeight='normal'
        style={{ wordSpacing: '10px' }}
      >
        We deliver fresh always
      </Heading>
    </Box>
  );
};

export default Hero;
