import { ReactNode } from 'react';
import styles from './PokemonList.module.scss';
import { PokemonType } from '@/lib/type';

interface PokemonListElementLayoutProp {
  children: ReactNode;
  data: PokemonType;
  onClick?: () => void;
  className?: string;
}

const PokemonListElementLayout = ({
  children,
  data,
  onClick,
  className,
}: PokemonListElementLayoutProp) => {
  return (
    <li
      className={`${styles.pokemon_list_element} ${className || ''}`}
      onClick={onClick}
    >
      <div className={styles.pokemon_number}>
        <span>{`No.${data.id}`}</span>
      </div>
      {children}
    </li>
  );
};

export default PokemonListElementLayout;
