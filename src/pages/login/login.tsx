import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UserWindowWrapper from "../../components/user-window-wrapper/user-window-wrapper";
import AdditionalActions from "../../components/additional-actions/additional-actions";
import { login } from "../../services/actions/actions";
import { useState } from "react";
import { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";

function Login() {

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(login(state, setState) as string & boolean);
  };

  const [state, setState] = useState({
    email: '',
    password: '',
    isSuccess: false,
  });

  return (
    <>
      { state.isSuccess && <Navigate to="/" replace={true} /> }
      <UserWindowWrapper title={'Вход'} formName={'login-form'} onSubmit={handleSubmit}>
        <Input placeholder="E-mail" type="email" value={state.email} onChange={event => setState({...state, email: event.target.value})} />
        <Input placeholder="Пароль" type="password" icon="ShowIcon" value={state.password} onChange={event => setState({...state, password: event.target.value})} />
        <Button htmlType="submit" type="primary" size="medium">Войти</Button>
      </UserWindowWrapper>
      <AdditionalActions text={'Вы - новый пользователь?'} link={'/register'} linkText={'Зарегистрироваться'} />
      <AdditionalActions text={'Забыли пароль?'} link={'/forgot-password'} linkText={'Восстановить пароль'} />
    </>
  );
};

export default Login;
