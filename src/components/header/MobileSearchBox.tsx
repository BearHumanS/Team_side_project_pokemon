import { Dispatch, MouseEvent, SetStateAction } from 'react';
import SearchInput from '../search/Search';
import styles from './Header.module.scss';

const MobileSearchBox = ({
  isOpen,
}: {
  isOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.mobile__search__container} onClick={onClick}>
      <SearchInput isOpen={isOpen} />
    </div>
  );
};

export default MobileSearchBox;
