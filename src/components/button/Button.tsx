import styles from './Button.module.scss';
import { FaPen } from '@react-icons/all-files/fa/FaPen';

interface Props {
  data?: string;
}

const Button = ({ data }: Props) => {
  return <div className={styles.ButtonStyle}>{data}</div>;
};

const ButtonLg = ({ data }: Props) => {
  return <div className={styles.ButtonLgStyle}>{data}</div>;
};

const ButtonCategory = ({ data }: Props) => {
  return <div className={styles.ButtonCategory}>{data}</div>;
};

const ButtonEdit = ({ data }: Props) => {
  return <div className={styles.ButtonEdit}>{data}</div>;
};

const ButtonDel = ({ data }: Props) => {
  return <div className={styles.ButtonDel}>{data}</div>;
};

const ButtonCircle = () => {
  return (
    <div className={styles.ButtonCircle}>
      <FaPen />
    </div>
  );
};

export {
  Button,
  ButtonCategory,
  ButtonEdit,
  ButtonDel,
  ButtonLg,
  ButtonCircle,
};
