import styles from './Plate.module.scss';
import { IoChevronUp } from '@react-icons/all-files/io5/IoChevronUp';
import { motion } from 'framer-motion';
interface PlateHideButtonProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlateHideButton = ({ isOpen, setIsOpen }: PlateHideButtonProp) => {
  const variant = {
    open: { rotate: 0 },
    close: { rotate: 180 },
  };

  return (
    <button
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      className={styles.hide_button}
    >
      <motion.div
        className={styles.pc_button}
        variants={variant}
        animate={isOpen ? 'open' : 'close'}
        transition={{ duration: 0.4 }}
      >
        <IoChevronUp />
      </motion.div>
      <span className={styles.mobile_button}>타입 선택</span>
    </button>
  );
};

export default PlateHideButton;
