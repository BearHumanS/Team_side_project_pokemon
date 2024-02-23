import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import SocialLogin from '../users/SocialLogin';
import MobileModal from '../modal/MobileModal';

const MobileNavMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <FaRegAddressCard size={24} />
            도감
          </div>
        </NavLink>
        <NavLink
          to="cardedit"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <FiPlusSquare size={24} />
            카드 제작
          </div>
        </NavLink>
        <NavLink
          to="community"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <MdRecordVoiceOver size={24} />
            커뮤니티
          </div>
        </NavLink>

        <div className={styles.nav__item__mobile} onClick={onToggleModal}>
          {user ? (
            <>
              <div className={styles.nav__profile__img}>
                <img
                  style={{ borderRadius: '50%' }}
                  src={user?.photoURL || undefined}
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
