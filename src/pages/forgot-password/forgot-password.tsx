import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UserWindowWrapper from "../../components/user-window-wrapper/user-window-wrapper";
import AdditionalActions from "../../components/additional-actions/additional-actions";
import { useState } from "react";
import { recoverPassword } from "../../services/actions/actions";
import { Navigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAppDispatch } from "../../hooks/hooks";

function ForgotPassword() {

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(recoverPassword(state, setState) as string & boolean);
  };

  const [state, setState] = useState({
    value: '',
    isSuccess: false,
  });

  return(
    <>
      { state.isSuccess && <Navigate to="/reset-password" replace={true} /> }
      <UserWindowWrapper title={'Восстановление пароля'} formName={'forgot-password-form'} onSubmit={handleSubmit}>
        <Input placeholder="Укажите e-mail" type="email" value={state.value} onChange={event => setState({...state, value: event.target.value})} />
        <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
      </UserWindowWrapper>
      <AdditionalActions text={'Вспомнили пароль?'} link={'/login'} linkText={'Войти'} />
    </>
  );
};

export default ForgotPassword;
