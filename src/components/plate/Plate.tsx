import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Plate.module.scss';

interface PlateProp {
  pokemonTypeProp: string;
}

const Plate = ({ pokemonTypeProp }: PlateProp) => {
  const pathName = usePathname();
  const isMyPage = pathName.includes('mypage');

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
      <Image
        className={styles.type_image}
        src={`/icons/${koreanType}_on.svg`}
        alt={`${koreanType}타입 아이콘`}
        width={20}
        height={20}
      />
      <span>{koreanType}</span>
    </div>
  );

  return (
    <div className={styles.plate_wrapper}>{renderTypes(pokemonTypeProp)}</div>
  );
};

export default Plate;
