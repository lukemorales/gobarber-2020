declare namespace Express {
  type TFunction = import('./i18next.overrides').TFunction;

  export interface Request extends TypedWithT<TranslationKeys> {
    user: {
      id: string;
    };
    t: TFunction;
  }
}
