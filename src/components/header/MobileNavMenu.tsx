import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaRegAddressCard } from '@react-icons/all-files/fa/FaRegAddressCard';
// import { BsFilePlus } from '@react-icons/all-files/bs/BsFilePlus';
// import { RiUserVoiceFill } from '@react-icons/all-files/ri/RiUserVoiceFill';
// import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { RiLoginBoxLine } from '@react-icons/all-files/ri/RiLoginBoxLine';
import { FiPlusSquare } from '@react-icons/all-files/fi/FiPlusSquare';
import { MdRecordVoiceOver } from '@react-icons/all-files/md/MdRecordVoiceOver';
import styles from './Header.module.scss';
import useUserStore from '@/store/useUsersStore';
import { Modalportal } from '@/portal';
import MobileModal from '../modal/MobileModal';
import dynamic from 'next/dynamic';

const SocialLogin = dynamic(() => import('../users/SocialLogin'), {
  ssr: false,
});

const MobileNavMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();

  const getClassName = (path: string): string => {
    return pathName === path ? styles.active : '';
  };

  const { user } = useUserStore();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={styles.mobile__Navmenu__container} onClick={onClick}>
        <Link href="/" className={getClassName('/')}>
          <div className={styles.nav__item__mobile}>
            <FaRegAddressCard size={24} />
            도감
          </div>
        </Link>
        <Link href="/cardedit" className={getClassName('/cardedit')}>
          <div className={styles.nav__item__mobile}>
            <FiPlusSquare size={24} />
            카드 제작
          </div>
        </Link>
        <Link href="/community" className={getClassName('/community')}>
          <div className={styles.nav__item__mobile}>
            <MdRecordVoiceOver size={24} />
            커뮤니티
          </div>
        </Link>

        <div className={styles.nav__item__mobile} onClick={onToggleModal}>
          {user ? (
            <>
              <div className={styles.nav__profile__img}>
                <Image
                  style={{ borderRadius: '50%' }}
                  src={user?.photoURL || undefined || ''}
                  alt="프로필 사진"
                  width={31}
                  height={31}
                />
              </div>
              나의 메뉴
            </>
          ) : (
            <>
              <RiLoginBoxLine size={24} />
              로그인
            </>
          )}

          {isModalOpen && (
            <Modalportal>
              <MobileModal>
                <SocialLogin isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
              </MobileModal>
            </Modalportal>
          )}
        </div>
      </nav>
    </>
  );
};

export default MobileNavMenu;
