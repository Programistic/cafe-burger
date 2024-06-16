import { Link } from 'react-router-dom';
import { FC } from 'react';
import styles from './additional-actions.module.css';

interface IAdditionalActionsProps {
  text: string,
  link: string,
  linkText: string,
}

const AdditionalActions: FC<IAdditionalActionsProps> = ({ text, link, linkText }) => {
  return (
    <p className={styles.container}>
        {text}
        <Link to={link} className={styles.link}>
          {linkText}
        </Link>
    </p>
  );
};

export default AdditionalActions;
