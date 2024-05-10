import { ReactNode } from 'react';
import styles from './PokemonDex.module.scss';
import { PokemonType } from '@/lib/type';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

interface PokemonDexElementLayoutProp {
  children: ReactNode;
  data: PokemonType;
  onClick?: () => void;
  className?: string;
}

const PokemonDexElementLayout = ({
  children,
  data,
  onClick,
  className,
}: PokemonDexElementLayoutProp) => {
  const id = useParams();

  const number = () => {
    if (data.id < 10) {
      return '00' + data.id;
    } else if (data.id < 100) {
      return '0' + data.id;
    } else {
      return data.id;
    }
  };

  const getHighlightClass = () => {
    return data.id.toString() === id.pokemonId ? styles.highlighted : '';
  };

  return (
    <ul>
      <motion.li
        whileHover={{
          scale: 1.02,
          boxShadow: `rgba(0, 0, 0, 0.10) 0px 3px 20px`,
        }}
        transition={{ duration: 0.2 }}
        className={`${styles.pokemon_list_element} ${getHighlightClass()} ${
          className || ''
        }`}
        onClick={onClick}
      >
        <div className={styles.pokemon_number}>
          <span>{`${number()}`}</span>
        </div>
        {children}
      </motion.li>
    </ul>
  );
};

export default PokemonDexElementLayout;
