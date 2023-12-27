import { FormEvent, useState, useMemo } from 'react';
import styles from './cards.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import { POKEMON_TYPES } from '@/lib/constants';
import { useGetAllPokemon } from '@/query/qeuries';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { PokemonType, TypesType } from '@/lib/type';
import SearchDropdown from './SearchDropdown';

const PokemonSearch = () => {
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [foundPokemon, setFoundPokemon] = useState<
    (PokemonType | undefined)[] | null
  >(null);
  const { data } = useGetAllPokemon(1017);

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
    <div className={styles.search_form_wrapper}>
      <span className={styles.title}>포켓몬 검색하기</span>
      <form className={styles.search__wrapper} onSubmit={onSubmit}>
        <label className={styles.search__inner}>
          <input
            onChange={(event) => setText(event.target.value)}
            value={text}
            type="text"
            placeholder="포켓몬 이름, 타입을 입력해 주세요"
            className={styles.search__input}
          />
          <button type="submit" className={styles.search__button}>
            <IoSearch />
          </button>
        </label>
        {isOpen && foundPokemon && (
          <SearchDropdown searchResults={foundPokemon} setIsOpen={setIsOpen} />
        )}
      </form>
    </div>
  );
};

export default PokemonSearch;
