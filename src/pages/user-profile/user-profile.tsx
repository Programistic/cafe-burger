import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "../../services/actions/actions";
import { FormEvent } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import styles from './user-profile.module.css';

function UserProfile() {

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store) => ({user: store.user.user} as any), shallowEqual);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(updateUser(state, setState) as string & boolean);
  };

  const [state, setState] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

  const [visible , setVisible] = useState({isVisible: false});

  useEffect(() => {
      const isVisible = (state.name === user.name && state.email === user.email && state.password === '') ? false : true;
      setVisible({isVisible});
    }, [state]
  );

  const handleButtonCancelClick = () => {
    const oldName = user.name;
    const oldEmail = user.email;
    setState({...state, password: '', name: oldName, email: oldEmail});
  };

  return (
    <div className={styles.innerContainer}>
      <form className={styles.form} name='profile-form' onSubmit={handleSubmit}>
        <Input placeholder="Имя" type="text" icon="EditIcon" value={state.name} onChange={event => setState({...state, name: event.target.value})} />
        <Input placeholder="Логин" type="text" icon="EditIcon" value={state.email} onChange={event => setState({...state, email: event.target.value})} />
        <Input placeholder="Пароль" type="password" icon="EditIcon" value={state.password} onChange={event => setState({...state, password: event.target.value})} />
        { visible.isVisible &&
          <div className={styles.buttonContainer}>
            <Button  htmlType="button" type="secondary" size="medium" onClick={handleButtonCancelClick}>Отмена</Button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div>
        }
      </form>
    </div>
  )
};

export default UserProfile;
