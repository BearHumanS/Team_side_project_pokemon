import { useState } from 'react';
import Image from 'next/image';
import styles from './select.module.scss';
import { Modalportal } from '@/portal';
import SelectModal from '@/components/modal/SelectModal';

interface SelectPokemonMobileButtonProps {
  buttonData: ButtonData;
}

interface ButtonData {
  url: string;
  title: string;
  description: string;
}

const SelectPokemonMobileButton = ({
  buttonData,
}: SelectPokemonMobileButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { url, title, description } = buttonData;

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles.selector_button} onClick={onClick}>
        <div className={styles.img_wrapper}>
          <Image src={url} alt="포켓몬 이미지" width={100} height={100} />
        </div>
        <div className={styles.text_wrapper}>
          <span>{title}</span>
          <p>{description}</p>
        </div>
      </button>
      {isOpen ? (
        <Modalportal>
          <SelectModal onClick={onClick} title={title} />
        </Modalportal>
      ) : null}
    </>
  );
};

export default SelectPokemonMobileButton;
