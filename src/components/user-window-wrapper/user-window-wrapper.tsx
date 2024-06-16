import { FC } from 'react';
import { FormEvent } from 'react';
import styles from './user-window-wrapper.module.css';

interface IUserWindowWrapperProps {
  children: React.ReactNode;
  title: string;
  formName: string;
  onSubmit: (event: FormEvent) => void;
}

const UserWindowWrapper: FC<IUserWindowWrapperProps> = ({ children, title, formName, onSubmit }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <form className={styles.form} name={formName} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default UserWindowWrapper;
