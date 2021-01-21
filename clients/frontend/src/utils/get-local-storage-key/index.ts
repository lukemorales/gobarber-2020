import { LOCAL_STORAGE_KEY } from '~/constants';

export default (key: string) => `${LOCAL_STORAGE_KEY}:${key}`;
