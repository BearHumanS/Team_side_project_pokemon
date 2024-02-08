import { FormEvent, useState, useMemo, useRef, useEffect } from 'react';
import styles from './search.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import { POKEMON_TYPES } from '@/lib/constants';
import { useGetAllPokemon } from '@/query/qeuries';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { PokemonType, TypesType } from '@/lib/type';
import SearchDropdown from './SearchDropdown';

const SearchPokemon = () => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [foundPokemon, setFoundPokemon] = useState<
    (PokemonType | undefined)[] | null
  >(null);
  const { data } = useGetAllPokemon(1017);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const searchedPokemonName = useMemo(() => POKEMON_NAME[text], [text]);
  const searchedPokemonType = useMemo(
    () => reverseObject(POKEMON_TYPES)[text],
    [text],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    let result = null;

    if (searchedPokemonName && data) {
      result = [data.find((pokemon) => pokemon.name === searchedPokemonName)];
    } else if (searchedPokemonType && data) {
      result = data.filter((pokemon) =>
        pokemon.types.some(
          (type: TypesType) => type.type.name === searchedPokemonType,
        ),
      );
    }

    setFoundPokemon(result);
    setIsOpen(true);
  };

  return (
    <div
      className={`${styles.search_form_wrapper} ${
        isOpen ? styles.dropdown_open : ''
      }`}
    >
      <span className={styles.title}>포켓몬 검색하기</span>
      <form className={styles.search_wrapper} onSubmit={onSubmit}>
        <label className={styles.search_container}>
          <input
            onChange={(event) => setText(event.target.value)}
            value={text}
            type="text"
            placeholder="포켓몬 이름, 타입을 입력해 주세요"
            className={styles.input}
          />
          <button type="submit" className={styles.submit_button}>
            <IoSearch />
          </button>
        </label>
        {isOpen && foundPokemon && (
          <div className={styles.dropdown_ref_box} ref={wrapperRef}>
            <SearchDropdown
              searchResults={foundPokemon}
              setIsOpen={setIsOpen}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchPokemon;
