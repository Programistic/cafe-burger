import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import UserWindowWrapper from "../../components/user-window-wrapper/user-window-wrapper";
import AdditionalActions from "../../components/additional-actions/additional-actions";
import { register } from "../../services/actions/actions";
import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";

function Register() {

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(register(state, setState) as string & boolean);
  };

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    isSuccess: false,
  });

  return(
    <>
      { state.isSuccess && <Navigate to="/login" replace={true} /> }
      <UserWindowWrapper title={'Регистрация'} formName={'register-form'} onSubmit={handleSubmit}>
        <Input placeholder="Имя" type="text" value={state.name} onChange={event => setState({...state, name: event.target.value})} />
        <Input placeholder="E-mail" type="email" value={state.email} onChange={event => setState({...state, email: event.target.value})} />
        <Input placeholder="Пароль" type="password" icon="ShowIcon" value={state.password} onChange={event => setState({...state, password: event.target.value})} />
        <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
      </UserWindowWrapper>
      <AdditionalActions text={'Уже зарегистрированы?'} link={'/login'} linkText={'Войти'} />
    </>
  );
};

export default Register;
