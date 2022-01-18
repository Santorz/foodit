import { FC, useContext } from 'react';
import { Container } from '@chakra-ui/react';
import { BodyWidthContext, NavHeightContext } from '../pages/_app';
import { useMediaQuery } from 'react-responsive';

interface PageWrapperInterface {
  hasSidebar?: string | boolean | undefined;
}

const PageWrapper: FC<PageWrapperInterface> = ({ children, ...props }) => {
  // Hooks
  const bodyWidth = useContext(BodyWidthContext);
  const navHeight = useContext(NavHeightContext);
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  const isSmartPhoneandTablet = useMediaQuery({ query: '(max-width: 62em)' });
  const isDesktopOnly = useMediaQuery({ query: '(min-width:  80em)' });

  //   Main JSX
  return (
    <Container
      mt={`${navHeight + (isSmartPhoneOnly ? 0 : 20)}px`}
      w={!isDesktopOnly ? 'full' : `${(bodyWidth / 5) * 4 - 100}px`}
      maxW={!isDesktopOnly ? 'full' : `${(bodyWidth / 5) * 4 - 100}px`}
      p='0'
      ml={`${isSmartPhoneOnly ? '0' : bodyWidth / 5}px`}
    >
      {children}
    </Container>
  );
};

PageWrapper.displayName = 'PageWrapper';
export default PageWrapper;
