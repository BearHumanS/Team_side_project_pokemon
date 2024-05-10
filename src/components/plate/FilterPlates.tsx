'use client';

import Image from 'next/image';
import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';
import useSelectedStore from '@/store/useSelectedStore';
import PlateHideButton from './PlateHideButton';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

const FilterPlates = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedPlate, setSelectedPlate } = useSelectedStore();
  const innerWidth = useCalculateInnerWidth();

  const variants = {
    open: { height: '200px', opacity: 1 },
    closed: { height: 0, opacity: 0 },
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
          <Image
            className={styles.type_image}
            src={`/icons/${koreanType}_${isPlateSelected ? 'on' : 'off'}.svg`}
            alt={`${koreanType}타입 아이콘`}
            width={20}
            height={20}
          />
          <span>{koreanType}</span>
        </div>
      );
    });

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={innerWidth <= 768 ? {} : variants}
            className={styles.container}
          >
            <div className={styles.inner}>
              <motion.span className={styles.description}>
                *속성을 선택해주세요. (중복 선택 가능)
              </motion.span>
              <motion.div className={styles.type_plates}>
                {renderTypes(koreanTypes)}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div></div>
        )}
      </AnimatePresence>
      <PlateHideButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default FilterPlates;
