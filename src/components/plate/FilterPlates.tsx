import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';
import useSelectedStore from '@/store/useSelectedStore';
import PlateHideButton from './PlateHideButton';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FilterPlates = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedPlate, setSelectedPlate } = useSelectedStore();

  const variants = {
    open: { height: '200px' },
    closed: { height: 0 },
  };

  const renderTypes = (types: string[]) =>
    types.map((koreanType) => {
      const isPlateSelected = selectedPlate.includes(koreanType);
      const plateClassName = isPlateSelected
        ? styles.click_plate
        : styles.unclick_plate;

      return (
        <div
          onClick={() => {
            setSelectedPlate(koreanType);
          }}
          className={`${plateClassName} ${styles[koreanType]}`}
          key={koreanType}
          data-type={koreanType}
        >
          <img
            className={styles.type_image}
            src={`/icons/${koreanType}_${isPlateSelected ? 'on' : 'off'}.svg`}
            alt={`${koreanType}타입 아이콘`}
          />
          <span>{koreanType}</span>
        </div>
      );
    });

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.3 }}
            className={styles.container}
          >
            <div className={styles.inner}>
              <motion.span className={styles.description}>
                속성을 선택해주세요. (중복 선택 가능)
              </motion.span>
              <motion.div className={styles.type_plates}>
                {renderTypes(koreanTypes)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PlateHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default FilterPlates;
