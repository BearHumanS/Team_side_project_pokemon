import { useLocation } from 'react-router-dom';
import styles from './Plate.module.scss';

interface PlateProp {
  pokemonTypeProp: string;
}

const Plate = ({ pokemonTypeProp }: PlateProp) => {
  const location = useLocation();
  const isMyPage = location.pathname.includes('mypage');

  const renderTypes = (koreanType: string) => (
    <div
      className={
        isMyPage
          ? `${styles.type_plate__my} ${styles[koreanType]}`
          : `${styles.type_plate} ${styles[koreanType]}`
      }
      key={koreanType}
      data-type={koreanType}
    >
      <img
        className={styles.type_image}
        loading="lazy"
        src={`/icons/${koreanType}_on.svg`}
        alt={`${koreanType}타입 아이콘`}
      />
      <span>{koreanType}</span>
    </div>
  );

  return <div className={styles.wrapper}>{renderTypes(pokemonTypeProp)}</div>;
};

export default Plate;
