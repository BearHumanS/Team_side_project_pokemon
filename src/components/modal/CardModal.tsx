import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import PokemonCard from '../card/PokemonCard';
import { Card } from '../mypage/Mycard';
import styles from './CardModal.module.scss';
import { MouseEvent, useRef } from 'react';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

interface CardModalProps {
  tagName?: string;
  onModalToggle: (e: MouseEvent<HTMLDivElement>) => void;
  cardData: Card | null | undefined;
  isOpen?: boolean;
}

const CardModal = ({ onModalToggle, cardData, isOpen }: CardModalProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const windowWidth = useCalculateInnerWidth();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [-30, 30]);
  const rotateY = useTransform(x, [-1, 1], [-30, 30]);

  const controls = useAnimation();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && windowWidth > 768) {
      const rect = cardRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const xPercent = offsetX / (rect.width / 2);
      const yPercent = offsetY / (rect.height / 2);

      x.set(xPercent);
      y.set(yPercent);
    }
  };
  const handleMouseLeave = () => {
    if (windowWidth > 768) {
      controls.start({
        rotateX: 0,
        rotateY: 0,
      });
    }
  };

  const card = cardData?.data;
  const pokemonNickName = {
    pokemonNickName1: card?.pokemonCardData[1],
    pokemonNickName2: card?.pokemonCardData[2],
    pokemonName: card?.pokemonCardData[3],
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onDownloadBtn = () => {
    const card = cardRef.current;
    if (card) {
      const filter = (card: Node) => {
        return (card as HTMLElement).tagName !== 'BUTTON';
      };
      domtoimage.toBlob(card, { filter: filter }).then((blob) => {
        saveAs(blob, 'card.png');
      });
    }
  };

  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__overlay} onClick={onModalToggle}>
        <div onClick={handleContentClick}>
          <div className={styles.download__box}>
            <button style={{ zIndex: '20' }} onClick={onDownloadBtn}>
              다운로드
            </button>
          </div>
          <div className={styles.close__btn}>
            <div onClick={onModalToggle}>
              <FiPlus size={20} className={styles.rotate} />
            </div>
          </div>
          <motion.div
            ref={cardRef}
            className={styles.modal__contents}
            onClick={handleContentClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div className={styles.modal__contents__close}></div>
            <motion.div
              className={styles.modal__contents}
              style={{
                rotateX,
                rotateY,
              }}
              initial={{ rotateX: 0, rotateY: 0 }}
              animate={controls}
            >
              <PokemonCard
                isOpen={isOpen}
                pokemonCardData={card?.pokemonCardData[0]}
                pokemonNickName={pokemonNickName}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
