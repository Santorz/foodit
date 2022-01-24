import { FC, useContext, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import {
  BodyWidthContext,
  NavHeightContext,
  PageHasSidebarContext,
} from '../../pages/_app';
import { useMediaQuery } from 'react-responsive';

interface PageWrapperInterface {
  hasSidebar?: boolean | undefined;
  userSelect?: string;
  style?: {};
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
  const isTabletOnly = useMediaQuery({
    query: '(min-width: 48em) and (max-width: 62em)',
  });

  // Props
  const { hasSidebar, style } = props;

  // useEffects
  useEffect(() => {
    if (setPageHasSidebar !== null) {
      setPageHasSidebar(hasSidebar ? true : false);
    }
  }, [hasSidebar, setPageHasSidebar, pageHasSidebar]);

  //   Main JSX
  return (
    <Container
      style={style}
      mt={`${navHeight + (isSmartPhoneOnly ? 0 : isTabletOnly ? 5 : 20)}px`}
      w={
        isTabletOnly
          ? `${(bodyWidth / 4) * 3}px`
          : !isDesktopOnly || hasSidebar !== true
          ? 'full'
          : `${(bodyWidth / 5) * 4 - 200}px`
      }
      maxW={
        isTabletOnly
          ? `${(bodyWidth / 4) * 3}px`
          : !isDesktopOnly || hasSidebar !== true
          ? 'full'
          : `${(bodyWidth / 5) * 4 - 200}px`
      }
      p='0'
      ml={`${
        isSmartPhoneOnly || hasSidebar !== true
          ? '0'
          : isTabletOnly
          ? bodyWidth / 4
          : bodyWidth / 5
      }px`}
      mx={!hasSidebar ? 'auto !important' : 'inherit'}
    >
      {children}
    </Container>
  );
};

PageWrapper.displayName = 'PageWrapper';
export default PageWrapper;
