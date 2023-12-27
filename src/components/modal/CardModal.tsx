import PokemonCard from '../card/PokemonCard';
import { Card } from '../mypage/Mycard';
import styles from './CardModal.module.scss';
import { MouseEvent, useRef } from 'react';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface CardModalProps {
  tagName?: string;
  onModalToggle: (e: MouseEvent<HTMLDivElement>) => void;
  cardData: Card | null | undefined;
  isOpen?: boolean;
}

const CardModal = ({ onModalToggle, cardData, isOpen }: CardModalProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const card = cardData?.data;
  const pokemonNickName = {
    pokemonNickName1: card?.pokemonCardData[1],
    pokemonNickName2: card?.pokemonCardData[2],
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
            <button style={{ zIndex: '9999' }} onClick={onDownloadBtn}>
              다운로드
            </button>
          </div>
          <div className={styles.close__btn}>
            <div onClick={onModalToggle}>
              <FiPlus size={20} className={styles.rotate} />
            </div>
          </div>
          <div
            ref={cardRef}
            className={styles.modal__contents}
            onClick={handleContentClick}
          >
            <div className={styles.modal__contents__close}></div>
            <div className={styles.modal__contents}>
              <PokemonCard
                isOpen={isOpen}
                pokemonCardData={card?.pokemonCardData[0]}
                pokemonNickName={pokemonNickName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
