import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { Modalportal } from '@/portal';
import { useEffect, useState, MouseEvent } from 'react';
import CardModal from '../modal/CardModal';
import { deleteDocument, getAllDocument } from '@/lib/firebaseQuery';
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
    navigate('/cardEdit');
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
  const maxCards = 6;
  for (let i = 0; i < maxCards; i++) {
    if (i < cards.length) {
      const card = cards[i];
      const pokemonNickName = {
        pokemonNickName1: card?.data.pokemonCardData[1],
        pokemonNickName2: card?.data.pokemonCardData[2],
        pokemonName: card?.data.pokemonCardData[3],
      };

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
            pokemonNickName={pokemonNickName}
            key={card.id}
          />
        </div>,
      );
    } else {
      cardLayout.push(
        <div className={styles.mycard__layout} key={i} onClick={onMoveMakeCard}>
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
