export type TResetPassword = {
  password: string;
  token: string;
  isSuccess: boolean;
};

export type TRecoverPassword = {
  value: string;
  isSuccess: boolean;
};
