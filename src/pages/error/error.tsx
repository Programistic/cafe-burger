import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { resetError } from "../../services/actions/error";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import styles from './error.module.css';

interface IErrorStatusProps {
  errorStatus: number;
}

const Error: FC<IErrorStatusProps> = ({ errorStatus }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetError());
    navigate('/');
  };

  const handleError = (errorStatus: number) => {
    switch (errorStatus) {
      case 400:
        return 'Невалидный запрос к серверу!';
      case 401:
        return 'Ошибка авторизации!';
      case 403:
        return 'Ошибка регистации!';
      case 404:
        return 'Запрашиваемый ресурс не найден';
      case 409:
        return 'Ошибка во время регистрации! Возможно, такой пользователь уже существует.';
      default:
        return 'Неизвестная ошибка!'
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{errorStatus}</h2>
      <p className={styles.text}>{handleError(errorStatus)}</p>
      <Button  htmlType="button" type="secondary" size="medium" onClick={handleClick}>Назад</Button>
    </div>
  );
}

export default Error;
