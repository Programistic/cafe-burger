import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalProps {
  closeModal: () => void;
}

const ModalOverlay: FC<IModalProps> = ({ closeModal }) => {

  return(
    <div className={styles.modalOverlay} onClick={closeModal} />
  );
}

export default ModalOverlay;
