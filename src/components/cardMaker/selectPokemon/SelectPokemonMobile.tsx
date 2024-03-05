import SelectPokemonMobileButton from './SelectPokemonMobileButton';
import styles from './select.module.scss';

const SelectPokemonMobile = () => {
  const like = {
    url: '/like_select.webp',
    title: '찜한 포켓몬',
    description: '찜한 포켓몬을 카드 제작에 사용할 수 있습니다.',
  };

  const random = {
    url: '/random_select.webp',
    title: '랜덤 포켓몬',
    description: '랜덤 카드를 생성하여 카드 제작에 사용할 수 있습니다.',
  };

  return (
    <div className={styles.mobile_wrapper}>
      <SelectPokemonMobileButton buttonData={like} />
      <SelectPokemonMobileButton buttonData={random} />
    </div>
  );
};

export default SelectPokemonMobile;
