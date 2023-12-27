import styles from './Plate.module.scss';

interface PlateHideButtonProp {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlateHideButton = ({ setIsOpen }: PlateHideButtonProp) => {
  return (
    <button
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      className={styles.hide_button}
    ></button>
  );
};

export default PlateHideButton;
