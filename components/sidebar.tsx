import { useContext, FC } from 'react';
import ActiveLink from './general/ActiveLink';
import {
  VStack,
  Flex,
  Box,
  StackDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import {
  BodyWidthContext,
  NavHeightContext,
  SidebarStateContext,
  PageHasSidebarContext,
} from '../pages/_app';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

// CSS
import generalStyles from '../styles/generalStyles.module.css';

// Sidebar Main Component
const SidebarContainer = () => {
  // Hooks
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  // const navHeight = useContext(NavHeightContext);
  const { pageHasSidebar } = useContext(PageHasSidebarContext);
  const { isSidebarOpen, onSidebarClose } = useContext(SidebarStateContext);

  return (
    <>
      {isSmartPhoneOnly && pageHasSidebar && (
        <Drawer
          placement='left'
          isOpen={isSidebarOpen}
          // @ts-ignore */
          onClose={onSidebarClose}
        >
          <DrawerContent>
            <SidebarContent p='0' m='0' w='100%' />
          </DrawerContent>
          <DrawerOverlay backdropFilter='blur(15px) saturate(180%)' />
        </Drawer>
      )}
      {!isSmartPhoneOnly && pageHasSidebar && <SidebarContent />}
    </>
  );
};

// End of Main Sidebar Conatiner

interface SidebarContentProps {
  w?: string;
  p?: string;
  m?: string;
}
// Sidebar Content
const SidebarContent: FC<SidebarContentProps> = ({ children, ...props }) => {
  const bodyWidth = useContext(BodyWidthContext);
  const navHeight = useContext(NavHeightContext);
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  const isTabletOnly = useMediaQuery({
    query: '(min-width: 48em) and (max-width: 62em)',
  });
  return (
    <>
      <Flex
        {...props}
        as='nav'
        direction='column'
        position={isSmartPhoneOnly ? 'relative' : 'fixed'}
        bg='transparent'
        gap='7'
        pb='20px'
        pl={{ base: '1', md: '0' }}
        pt={{ base: '1', md: '0' }}
        pr={{ base: 1.5, lg: '2' }}
        overflowY='auto'
        top={
          isSmartPhoneOnly
            ? '0px'
            : isTabletOnly
            ? `${navHeight + 5}px`
            : `${navHeight + 20}px`
        }
        bottom='0'
        w={
          isSmartPhoneOnly
            ? '100%'
            : isTabletOnly
            ? `${bodyWidth / 4}px`
            : `${bodyWidth / 5}px`
        }
        zIndex='3'
        css={{
          '&::-webkit-scrollbar': {
            width: '9px',
            maxHeight: '40px',
          },
          '&::-webkit-scrollbar-track': {
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'silver',
            borderRadius: '24px',
          },
        }}
      >
        <VStack
          p='0 !important'
          justify='left !important'
          align='left important'
          divider={
            <StackDivider borderColor='#445F43 !important' my='0 !important' />
          }
          border='1px solid #445F43 !important'
        >
          <SidebarBox header='true'>Categories</SidebarBox>
          <SidebarBox href='/category/fruitsandveg'>
            {'Fruits & Vegetables'}
          </SidebarBox>
          <SidebarBox href='/category/fish'>Fish</SidebarBox>
          <SidebarBox href='/category/meatandpoultry'>
            {'Meat & Poultry'}
          </SidebarBox>
          <SidebarBox href='/category/eggsandmilk'>{'Eggs & Milk'}</SidebarBox>
          <SidebarBox href='/category/nativeandingredients'>
            {'Native & Ingredients'}
          </SidebarBox>
        </VStack>
        <VStack
          p='0 !important'
          justify='left !important'
          align='left important'
          divider={
            <StackDivider borderColor='#445F43 !important' my='0 !important' />
          }
          border='1px solid #445F43 !important'
        >
          <SidebarBox header='true'>Information</SidebarBox>
          <SidebarBox>Delivery Information</SidebarBox>
          <SidebarBox href='/contact'>Contact us</SidebarBox>
        </VStack>
      </Flex>
    </>
  );
};

// Sidebar Box Component
interface SidebarboxProps {
  header?: boolean | string;
  href?: string;
}
const SidebarBox: FC<SidebarboxProps> = ({ children, ...props }) => {
  const { header, href } = props;
  const { asPath } = useRouter();
  return (
    <Box
      {...props}
      userSelect='none'
      fontSize={header === 'true' ? '20px' : '16px'}
      fontWeight={header === 'true' ? 'bold' : 'normal'}
    >
      {header === 'true' ? (
        <h3
          style={{
            display: 'block',
            width: '100%',
            height: 'inherit',
            padding: '20px 17px',
            background: `${
              asPath === '/' ? 'rgba(150, 201, 60, 0.4)' : 'white'
            }`,
          }}
        >
          {children}
        </h3>
      ) : (
        <ActiveLink
          activeClassName='activeSidebarLink'
          href={href === undefined ? '/#' : href}
        >
          <a
            style={{
              display: 'block',
              width: '100%',
              height: 'inherit',
              padding: '20px 17px',
              color: '#445F43',
            }}
          >
            {children}
          </a>
        </ActiveLink>
      )}
    </Box>
  );
};

export default SidebarContainer;
