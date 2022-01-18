import type { AppProps } from 'next/app';
import React, { useEffect, useRef, createContext, useState } from 'react';
import { ChakraProvider, Container, useDisclosure } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

type SidebarContextType = {
  isSidebarOpen: boolean;
  onSidebarOpen: null | (() => void);
  onSidebarClose: null | (() => void);
};

const SidebarDefaultValues = {
  isSidebarOpen: false,
  onSidebarOpen: null,
  onSidebarClose: null,
};

// Context
export const BodyWidthContext = createContext(0);
export const NavHeightContext = createContext(0);
export const SidebarStateContext =
  createContext<SidebarContextType>(SidebarDefaultValues);

function MyApp({ Component, pageProps }: AppProps) {
  // Hooks
  const appBodyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const {
    isOpen: isSidebarOpen,
    onOpen: onSidebarOpen,
    onClose: onSidebarClose,
  } = useDisclosure();

  // Funcs
  const setWidthFunc = () => {
    const bodyWidth = appBodyRef.current!.clientWidth;
    setBodyWidth(bodyWidth);
  };
  const setNavHeightFunc = () => {
    const navHeight = navRef.current!.clientHeight;
    setNavHeight(navHeight);
  };

  // useEffects
  useEffect(() => {
    setWidthFunc();
  }, [appBodyRef]);

  useEffect(() => {
    window.addEventListener('resize', setWidthFunc);
    return () => window.removeEventListener('resize', setWidthFunc);
  }, [bodyWidth]);

  useEffect(() => {
    setNavHeightFunc();
  }, [navRef, navHeight]);

  useEffect(() => {
    window.addEventListener('resize', setNavHeightFunc);
    return () => window.removeEventListener('resize', setNavHeightFunc);
  }, [navHeight]);

  // Main JSX
  return (
    <ChakraProvider>
      <BodyWidthContext.Provider value={bodyWidth}>
        <NavHeightContext.Provider value={navHeight}>
          <SidebarStateContext.Provider
            value={{
              isSidebarOpen,
              onSidebarOpen,
              onSidebarClose,
            }}
          >
            <Container
              position='relative'
              ref={appBodyRef}
              maxW='full'
              px={{ base: '0', xl: '100px !important' }}
            >
              <Navbar ref={navRef} />
              <Sidebar />
              <Component {...pageProps} />
            </Container>
          </SidebarStateContext.Provider>
        </NavHeightContext.Provider>
      </BodyWidthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
