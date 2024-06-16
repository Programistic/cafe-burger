import { compose } from 'redux';

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const checkResponseWithToken = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: number) => Promise.reject(err));
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const enhancer =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any)
    : compose;
