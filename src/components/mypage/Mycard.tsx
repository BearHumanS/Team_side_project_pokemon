import { useRouter } from 'next/navigation';
import styles from './Mypage.module.scss';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { Modalportal } from '@/portal';
import { useEffect, useState, MouseEvent, useCallback } from 'react';
import CardModal from '../modal/CardModal';
import { deleteDocument, getAllDocument } from '@/lib/firebaseQuery';
import useUserStore from '@/store/useUsersStore';
import { DocumentData } from 'firebase/firestore';
import PokemonCard from '../card/PokemonCard';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import useSlide from '@/hook/useSlide';
import { IoChevronForward } from '@react-icons/all-files/io5/IoChevronForward';
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import { motion } from 'framer-motion';
import MobileMypageAlert from './MobileMypageAlert';
import MobileModal from '../modal/MobileModal';

export interface Card {
  id: string;
  data: DocumentData;
}

const Mycard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null | undefined>(
    null,
  );
  const router = useRouter();
  const { user } = useUserStore();
  const windowWidth = useCalculateInnerWidth();
  const { index, prevSlide, nextSlide } = useSlide(6, 1);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }

      try {
        const docSnap = await getAllDocument(`/cards/${user.uid}/pokemonCards`);
        setCards(docSnap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSelectedCard(null);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setIsAlert(false);
    }
  }, [windowWidth]);

  const onMoveMakeCard = () => {
    if (windowWidth <= 768) {
      setIsAlert((prev) => !prev);
    } else router.push('/cardedit');
  };

  const onModalToggle = (card?: Card) => {
    if (!card && cards.length === 0) {
      return;
    }
    setIsOpen((prev) => !prev);
    setSelectedCard(card);
  };

  const onDeleteCard = (cardId: string | number) => async (e: MouseEvent) => {
    e.stopPropagation();
    const confirm = window.confirm('해당 카드를 삭제하시겠습니까?');
    if (confirm && user) {
      try {
        await deleteDocument(`/cards/${user.uid}/pokemonCards/${cardId}`);

        setCards((currentCards) =>
          currentCards.filter((card) => card.id !== cardId),
        );

        console.log('카드가 삭제되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const cardLayout = [];
  for (let i = 0; i < 6; i++) {
    if (i < cards.length) {
      const card = cards[i];
      cardLayout.push(
        <div
          className={styles.mycard__layout__data}
          key={card.id}
          onClick={() => onModalToggle(card)}
        >
          <div
            className={styles.mycard__layout__data__delete}
            onClick={onDeleteCard(card.id)}
          >
            <FiPlus size={24} color="#000" />
          </div>
          <PokemonCard
            pokemonCardData={card?.data.pokemonCardData[0]}
            pokemonNickName={{
              pokemonNickName1: card?.data.pokemonCardData[1],
              pokemonNickName2: card?.data.pokemonCardData[2],
              pokemonName: card?.data.pokemonCardData[3],
            }}
          />
        </div>,
      );
    } else {
      cardLayout.push(
        <div
          className={styles.mycard__layout}
          key={`empty-${i}`}
          onClick={onMoveMakeCard}
        >
          <FiPlus size={30} />
        </div>,
      );
    }
  }

  const onCloseOverlay = useCallback(() => {
    if (isAlert === true) {
      setIsAlert(false);
    }
  }, [isAlert]);

  return (
    <>
      <div className={styles.mycard__container}>
        <div className={styles.mycard__top__box}>
          <div className={styles.mycard__title}>나의 포켓몬 카드</div>
          <div className={styles.mycard__make__btn}>
            <button type="button" onClick={onMoveMakeCard}>
              카드 만들기
            </button>
          </div>
        </div>
        <div className={styles.mycard__layout__box}>
          {windowWidth <= 768 ? (
            <div className={styles.mycard__layout__slide}>
              <motion.button
                className={styles.mycard__layout__slide__prev}
                onClick={prevSlide}
                whileTap={{
                  color: '#0F60CE',
                  scale: 1.3,
                }}
              >
                <IoChevronBack size={30} />
              </motion.button>
              {cardLayout[index]}
              <motion.button
                className={styles.mycard__layout__slide__next}
                onClick={nextSlide}
                whileTap={{
                  color: '#0F60CE',
                  scale: 1.3,
                }}
              >
                <IoChevronForward size={30} />
              </motion.button>
            </div>
          ) : (
            cardLayout
          )}
        </div>
        {windowWidth <= 768 && (
          <div className={styles.mycard__layout__count}>
            {index + 1} / {cardLayout.length}
          </div>
        )}
      </div>

      {isOpen && (
        <Modalportal>
          <CardModal
            cardData={selectedCard}
            onModalToggle={() => onModalToggle()}
            isOpen={isOpen}
          />
        </Modalportal>
      )}

      {isAlert && (
        <Modalportal>
          <div className={styles.mobile__overlay} onClick={onCloseOverlay}>
            <MobileModal>
              <MobileMypageAlert isOpen={isAlert} />
            </MobileModal>
          </div>
        </Modalportal>
      )}
    </>
  );
};

export default Mycard;
