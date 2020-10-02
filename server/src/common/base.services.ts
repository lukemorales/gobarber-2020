import { TFunction } from '../@types/i18next.overrides';

class BaseService {
  constructor(protected readonly t: TFunction) {}
}

export default BaseService;
