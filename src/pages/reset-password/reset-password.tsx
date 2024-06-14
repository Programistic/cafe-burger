import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UserWindowWrapper from "../../components/user-window-wrapper/user-window-wrapper";
import AdditionalActions from "../../components/additional-actions/additional-actions";
import { resetPassword } from "../../services/actions/actions";
import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";

function ResetPassword() {

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(resetPassword(state, setState) as string & boolean);
  };

  const [state, setState] = useState({
    password: '',
    token: '',
    isSuccess: false,
  });

  return(
    <>
      { state.isSuccess && <Navigate to="/login" replace={true} /> }
      <UserWindowWrapper title={'Восстановление пароля'} formName={'reset-password-form'} onSubmit={handleSubmit}>
        <Input placeholder="Введите новый пароль" icon="ShowIcon" type="password" value={state.password} onChange={event => setState({...state, password: event.target.value})} />
        <Input placeholder="Введите код из письма" type="text" value={state.token} onChange={event => setState({...state, token: event.target.value})} />
        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
      </UserWindowWrapper>
      <AdditionalActions text={'Вспомнили пароль?'} link={'/login'} linkText={'Войти'} />
    </>
  );
};

export default ResetPassword;
