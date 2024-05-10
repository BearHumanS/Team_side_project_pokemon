'use client';

import Image from 'next/image';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './Search.module.scss';
import { usePathname } from 'next/navigation';
import useSearchInputText from '@/store/useSearchInputText';
import useSelectedStore from '@/store/useSelectedStore';

const SearchInput = ({
  isOpen,
}: {
  isOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();
  const [text, setText] = useState<string>('');
  const { setInputText } = useSearchInputText();
  const { clearSelectedPlate } = useSelectedStore();

  useEffect(() => {
    setText('');
    setInputText('');
  }, [setInputText]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText(text);
    clearSelectedPlate();
    setText('');
    if (isOpen) {
      isOpen(false);
    }
  };

  if (pathName !== '/') {
    return null;
  }

  return (
    <form className={styles.main__search} onSubmit={onSubmit}>
      <label className={styles.search__inner}>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
          placeholder="포켓몬 이름을 입력해주세요"
          className={styles.main__search__bar}
        />
        <button type="submit" className={styles.search__btn}>
          <div className={styles.search__btn__img}>
            <Image
              src="/monster-ball.svg"
              alt="검색버튼"
              width={32}
              height={32}
            />
          </div>
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
