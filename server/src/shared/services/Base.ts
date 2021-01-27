import { TFunction } from '~/@types/i18next.overrides';

class BaseService {
  privateTranslateFunction: TFunction;

  public setTranslateFunction(value: TFunction) {
    this.privateTranslateFunction = value;
  }

  public get t() {
    if (!this.privateTranslateFunction) {
      throw new Error('Please set the request.t for this service');
    }

    return this.privateTranslateFunction;
  }
}

export default BaseService;
