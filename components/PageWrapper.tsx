import { FC, useContext, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import {
  BodyWidthContext,
  NavHeightContext,
  PageHasSidebarContext,
} from '../pages/_app';
import { useMediaQuery } from 'react-responsive';

interface PageWrapperInterface {
  hasSidebar?: boolean | undefined;
}

const PageWrapper: FC<PageWrapperInterface> = ({ children, ...props }) => {
  // Hooks
  const { pageHasSidebar, setPageHasSidebar } = useContext(
    PageHasSidebarContext
  );
  const bodyWidth = useContext(BodyWidthContext);
  const navHeight = useContext(NavHeightContext);
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  // const isSmartPhoneandTablet = useMediaQuery({ query: '(max-width: 62em)' });
  const isDesktopOnly = useMediaQuery({ query: '(min-width:  62em)' });

  // Props
  const { hasSidebar } = props;

  // useEffects
  useEffect(() => {
    if (setPageHasSidebar !== null) {
      setPageHasSidebar(hasSidebar ? true : false);
    }
  }, [hasSidebar, setPageHasSidebar, pageHasSidebar]);

  //   Main JSX
  return (
    <Container
      mt={`${navHeight + (isSmartPhoneOnly ? 0 : 20)}px`}
      w={
        !isDesktopOnly || hasSidebar !== true
          ? 'full'
          : `${(bodyWidth / 5) * 4 - 200}px`
      }
      maxW={
        !isDesktopOnly || hasSidebar !== true
          ? 'full'
          : `${(bodyWidth / 5) * 4 - 200}px`
      }
      p='0'
      ml={`${isSmartPhoneOnly || hasSidebar !== true ? '0' : bodyWidth / 5}px`}
    >
      {children}
    </Container>
  );
};

PageWrapper.displayName = 'PageWrapper';
export default PageWrapper;
