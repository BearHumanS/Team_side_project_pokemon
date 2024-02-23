import { ReactNode } from 'react';
import styles from './PokemonDex.module.scss';
import { PokemonType } from '@/lib/type';
import { motion } from 'framer-motion';

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
  const number = () => {
    if (data.id < 10) {
      return '00' + data.id
    } else if (data.id < 100) {
      return '0' + data.id
    } else {
      return data.id
    }
  }
  return (
    <motion.li
      whileHover={{
        scale: 1.02,
        boxShadow: `rgba(0, 0, 0, 0.10) 0px 3px 20px`,
      }}
      transition={{ duration: 0.2 }}
      className={`${styles.pokemon_list_element} ${className || ''}`}
      onClick={onClick}
    >
      <div className={styles.pokemon_number}>
        <span>{`${number()}`}</span>
      </div>
      {children}
    </motion.li>
  );
};

export default PokemonDexElementLayout;
