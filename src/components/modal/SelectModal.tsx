import SelectPokemonLike from '../cardMaker/selectPokemon/SelectPokemonLike';
import SelectPokemonRandom from '../cardMaker/selectPokemon/SelectPokemonRandom';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import styles from './selectModal.module.scss';

interface SelectModalProps {
  title: string;
  onClick: () => void;
}

const SelectModal = ({ title, onClick }: SelectModalProps) => {
  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal__wrapper}>
        <button className={styles.modal__close} onClick={onClick}>
          <IoClose />
        </button>
        {title === '랜덤 포켓몬' ? (
          <SelectPokemonRandom />
        ) : (
          <SelectPokemonLike />
        )}
      </div>
    </div>
  );
};

export default SelectModal;
