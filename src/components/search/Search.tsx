import { FormEvent, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useSearchInputText from '@/store/useSearchInputText';
import useSelectedStore from '@/store/useSelectedStore';
import { POKEMON_NAME } from '@/lib/pokemonName';

const SearchInput = () => {
  const location = useLocation();
  const [text, setText] = useState<string>('');
  const { setInputText } = useSearchInputText();
  const { clearSelectedPlate } = useSelectedStore();
  const [placeholder, setPlaceholder] = useState('검색어를 입력해주세요.');

  const searchPokemonParmas = POKEMON_NAME[text];

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.startsWith('/pokemon')) {
      setPlaceholder('포켓몬 이름을 입력해주세요.');
    }
    setText('');
    setInputText('');
  }, [location.pathname, setInputText]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText(text);
    clearSelectedPlate();
    switch (location.pathname) {
      case '/':
        setText('');
        console.log(text);
        break;
      case `/pokemon/${params.id}`:
        navigate(`/pokemon/${searchPokemonParmas}`);
        setText('');
        setInputText('');
        break;
    }
  };

  if (location.pathname !== '/') {
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
          placeholder={placeholder}
          className={styles.main__search__bar}
        />
        <button type="submit" className={styles.search__btn}>
          <img src="/search_icon.png" alt="검색버튼" />
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
