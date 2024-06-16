import { getDataRequest, getDataSuccess } from "./all-ingredients";
import { setOrderRequest, setOrderSuccess, getOrderRequest, getOrderSuccess } from "./order";
import { checkResponse } from "../../utils/constants";
import { checkResponseWithToken } from "../../utils/constants";
import { setError } from "./error";
import { setUser, resetUser } from "./user";
import { setLoggedIn, resetLoggedIn } from "./flag";
import { setIsPasswordResetRequest, resetIsPasswordResetRequest } from "./flag";
import {
  dataURL,
  orderURL,
  passwordRecoverURL,
  passwordResetURL,
  registerURL,
  loginURL,
  tokenURL,
  logoutURL,
  userURL
} from "../../utils/api-constants";
import { TUserFields } from "../../types/user";
import { TLogin } from "../../types/login";
import { TLogout } from "../../types/logout";
import { TRecoverPassword, TResetPassword } from "../../types/password";
import { TRegister } from "../../types/register";
import { AppDispatch } from "../../types/dispatch";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { updateTokenOptions } from "../../utils/api-constants";

// Запрос на регистрацию нового пользователя
export function register(state: TRegister, setState: Dispatch<SetStateAction<TRegister>>) {
  const registerOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": state.email,
      "password": state.password,
      "name": state.name,
    })
  };
  return async function (dispatch: AppDispatch) {
    return fetch(registerURL, registerOptions)
      .then(checkResponse)
      .then((res) => {
        setState({...state, isSuccess: res.success});
      })
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на вход в систему зарегистрированного пользователя, авторизация
export function login(state: TLogin, setState: Dispatch<SetStateAction<TLogin>>) {
  const loginOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": state.email,
      "password": state.password,
    })
  };
  return async function (dispatch: AppDispatch) {
    return fetch(loginURL, loginOptions)
      .then(checkResponse)
      .then(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(setUser({ user: res.user }));
        dispatch(setLoggedIn());
        setState({...state, isSuccess: res.success});
      })
      .catch(err => dispatch(setError(err.status)));
  };
};

let typeRequest: string;
let emptyUser: {
  name: '',
  email: '',
  password: '',
};
let emptySetUser = () => {};

// Запрос на получение данных пользователя
export function getUser() {
  typeRequest = 'getUser';
  const getUserOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') as string,
      },
    };
  return async function (dispatch: AppDispatch) {
    return fetch(userURL, getUserOptions) 
      .then(checkResponseWithToken)
      .then(res => {
        dispatch(setUser({ user: res.user }));
        dispatch(setLoggedIn());
      })
      .catch(err => {
        (err.message === 'jwt expired') ? dispatch(updateToken(typeRequest, emptyUser, emptySetUser) as any) : console.log(err);
      });
  };
};

// Запрос на обновление данных пользователя
export function updateUser(state: TUserFields, setState: Dispatch<SetStateAction<TUserFields>>) {
  typeRequest = 'updateUser';
  const updateUserOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
    body: JSON.stringify({
      "email": state.email,
      "password": state.password,
      "name": state.name,
    })
  }
  return async function (dispatch: AppDispatch) {
    return fetch(userURL, updateUserOptions)
      .then(checkResponseWithToken)
      .then(res => {
        dispatch(setUser({ user: res.user }));
        setState({...state, name: res.user.name, email: res.user.email});
      })
      .catch(err => {
        (err.message === 'jwt expired') ? dispatch(updateToken(typeRequest, state, setState) as any) : console.log(err);
      });
  };
};

// Запрос на обновление токена
export function updateToken(typeRequest: string, state: TUserFields, setState: Dispatch<SetStateAction<TUserFields>>) {
  return async function (dispatch: AppDispatch) {
    return fetch(tokenURL, updateTokenOptions)
      .then(checkResponse)
      .then(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        typeRequest === 'getUser' ? dispatch(getUser() as any) : dispatch(updateUser(state, setState) as any);
      })
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на обновление пароля
export function recoverPassword(state: TRecoverPassword, setState: Dispatch<SetStateAction<TRecoverPassword>>) {
  const recoverPasswordOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": state.value,
    })
  }
  return async function (dispatch: AppDispatch) {
    return fetch(passwordRecoverURL, recoverPasswordOptions)
      .then(checkResponse)
      .then(res => {
        dispatch(setIsPasswordResetRequest());
        setState({...state, isSuccess: res.success});
      })
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на сброс пароля
export function resetPassword(state: TResetPassword, setState: Dispatch<SetStateAction<TResetPassword>>) {
  const resetPasswordOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "password": state.password,
      "token": state.token,
    })
  }
  return async function (dispatch: AppDispatch) {
    return fetch(passwordResetURL, resetPasswordOptions)
      .then(checkResponse)
      .then(res => {
        dispatch(resetIsPasswordResetRequest());
        setState({...state, isSuccess: res.success});
      })
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на получение данных об ингредиентах
export function getData() {
  return async function (dispatch: AppDispatch) {
    dispatch(getDataRequest());
    return fetch(dataURL)
      .then(checkResponse)
      .then(res => dispatch(getDataSuccess(res.data)))
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на формирование заказа
export function setOrder(idArray: string[]) {
  const orderOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
    body: JSON.stringify({
      "ingredients": idArray,
    })
  }
  return async function (dispatch: AppDispatch) {
    dispatch(setOrderRequest());
    return fetch(orderURL, orderOptions)
      .then(checkResponse)
      .then(res => dispatch(setOrderSuccess(res.order.number)))
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на получение данных конкретного заказа
export function getOrder(number: string | undefined) {
  return async function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    return fetch(`${orderURL}/${number}`)
      .then(checkResponse)
      .then(res => dispatch(getOrderSuccess(res.orders)))
      .catch(err => dispatch(setError(err.status)));
  };
};

// Запрос на выход из системы
export function logout(state: TLogout, setState: Dispatch<SetStateAction<TLogout>>) {
  const logoutOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": localStorage.getItem('refreshToken'),
    })
  }
  return async function (dispatch: AppDispatch) {
    return fetch(logoutURL, logoutOptions)
      .then(checkResponse)
      .then(res => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        dispatch(resetUser());
        dispatch(resetLoggedIn());
        setState({...state, isSuccess: res.success});
      })
      .catch(err => dispatch(setError(err.status)));
  };
};
