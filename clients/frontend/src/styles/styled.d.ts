import 'styled-components';

import { dark as darkTheme } from './themes';

export type Theme = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
