import { container } from 'tsyringe';

import BCryptHashProvider from './HashProvider/implementation/BCryptHashProvider';
import HashProvider from './HashProvider/models/HashProvider';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
