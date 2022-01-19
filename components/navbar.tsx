import { createContext, useContext, forwardRef } from 'react';
import {
  HStack,
  Flex,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SidebarStateContext, PageHasSidebarContext } from '../pages/_app';
import { SearchIcon, HamburgerIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { CustomCartIcon } from './homepage/CustomIcons';
import Link from 'next/link';
import generalStyles from '../styles/generalStyles.module.css';

export const NavHeightContext = createContext(0);

const Navbar = forwardRef<HTMLDivElement>((props, ref) => {
  // Hooks
  // const isSmartPhoneandTablet = useMediaQuery({ query: '(max-width: 62em)' });
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  const { onSidebarOpen } = useContext(SidebarStateContext);
  const { pageHasSidebar } = useContext(PageHasSidebarContext);
  const { asPath: currentPath } = useRouter();

  // Main JSX
  return (
    <Flex
      ref={ref}
      width='100% !important'
      as='nav'
      py='1'
      m='0'
      justify='space-between'
      align='center'
      maxW='100% !important'
      position='fixed'
      px={{ base: '2', lg: '100px !important' }}
      right='0'
      left='0'
      top='0 !important'
      zIndex='99 !important'
      bg='white'
    >
      {/* Logo and mobile sidebar activator */}
      <HStack gap='3.5'>
        {isSmartPhoneOnly && pageHasSidebar && (
          <Button
            bg='transparent'
            rounded='none'
            p='0' // @ts-ignore */
            onClick={() => onSidebarOpen()}
          >
            <HamburgerIcon boxSize='2em' />
          </Button>
        )}
        {currentPath !== '/' ? (
          <Link href='/'>
            <a>
              <NavLogo />
            </a>
          </Link>
        ) : (
          <NavLogo />
        )}
      </HStack>

      {/* Search Bar */}
      <HStack gap='3.5'>
        <InputGroup w='max-content'>
          <Input
            border='1px solid #445F43 !important'
            type='search'
            w={{ base: '40', md: 'md', lg: 'lg' }}
            placeholder={
              isSmartPhoneOnly ? 'Search' : 'What are you looking for ?'
            }
            textAlign='center'
            rounded='none'
          />
          <InputRightElement>
            <Button bg='transparent' rounded='none'>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>

        {isSmartPhoneOnly && (
          <Button bg='transparent' rounded='none' p='0'>
            <TriangleDownIcon boxSize='1.75em' />
          </Button>
        )}
      </HStack>

      {/* Login / Register / Cart nav */}
      {!isSmartPhoneOnly && (
        <Flex gap='5' align='center'>
          <Link href='/login'>
            <a>Login</a>
          </Link>
          <Link href='/login'>
            <a>Register</a>
          </Link>
          <Link href='/cart' passHref>
            <a>
              <Icon h='28.56px' w='22px'>
                <CustomCartIcon />
              </Icon>
            </a>
          </Link>
        </Flex>
      )}
    </Flex>
  );
});

const NavLogo = () => {
  return (
    <Image
      src='/images/foodit-logo.png'
      alt='foodit logo'
      width='60'
      height='60'
      className={generalStyles.borderRad50}
      onContextMenu={(e) => e.preventDefault()}
      onDrag={(e) => e.preventDefault()}
    />
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
