import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { Modalportal } from '@/portal';
import { useEffect, useState } from 'react';
import CardModal from '../modal/CardModal';
import { getAllDocument } from '@/lib/firebaseQuery';
import useUserStore from '@/store/useUsersStore';
import { DocumentData } from 'firebase/firestore';
import PokemonCard from '../card/PokemonCard';

export interface Card {
  id: string;
  data: DocumentData;
}

const Mycard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null | undefined>(
    null,
  );
  const navigate = useNavigate();
  const { user } = useUserStore();

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

  const onMoveMakeCard = () => {
    navigate('/');
  };

  const onModalToggle = (card?: Card) => {
    if (!card && cards.length === 0) {
      return;
    }
    setIsOpen((prev) => !prev);
    setSelectedCard(card);
  };

  const cardLayout = [];
  for (let i = 0; i < 6; i++) {
    if (i < cards.length) {
      const card = cards[i];
      const pokemonNickName = {
        pokemonNickName1: card?.data.pokemonCardData[1],
        pokemonNickName2: card?.data.pokemonCardData[2],
      };

      cardLayout.push(
        <div
          className={styles.mycard__layout}
          key={card.id}
          onClick={() => onModalToggle(card)}
        >
          <PokemonCard
            pokemonCardData={card?.data.pokemonCardData[0]}
            pokemonNickName={pokemonNickName}
            key={card.id}
          />
        </div>,
      );
    } else {
      cardLayout.push(
        <div className={styles.mycard__layout} key={i}>
          <FiPlus size={30} />
        </div>,
      );
    }
  }

  return (
    <>
      <div className={styles.mycard__container}>
        <div className={styles.mycard__top__box}>
          <div className={styles.mycard__title}>내가 만든 포켓몬 카드</div>
          <div className={styles.mycard__make__btn}>
            <button type="button" onClick={onMoveMakeCard}>
              카드 만들기
            </button>
          </div>
        </div>
        <div className={styles.mycard__layout__box}>{cardLayout}</div>
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
    </>
  );
};

export default Mycard;
