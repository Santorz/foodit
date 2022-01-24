import { extendTheme, theme as base } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: `Reem Kufi, ${base.fonts?.heading}`,
    body: `Roboto, ${base.fonts?.body}`,
  },
});

export default customTheme;
