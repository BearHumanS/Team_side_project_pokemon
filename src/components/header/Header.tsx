import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import SocialLogin from '../users/SocialLogin';
import { FaRegAddressCard } from '@react-icons/all-files/fa/FaRegAddressCard';
// import { BsFilePlus } from '@react-icons/all-files/bs/BsFilePlus';
// import { RiUserVoiceFill } from '@react-icons/all-files/ri/RiUserVoiceFill';
// import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { RiLoginBoxLine } from '@react-icons/all-files/ri/RiLoginBoxLine';
import { FiPlusSquare } from '@react-icons/all-files/fi/FiPlusSquare';
import { MdRecordVoiceOver } from '@react-icons/all-files/md/MdRecordVoiceOver';
import { useCallback, useEffect, useRef, useState } from 'react';
import useUserStore from '@/store/useUsersStore';
import SearchInput from '../search/Search';
import MobileNav from './MobileNav';
import MobileSearchBox from './MobileSearchBox';
import MobileNavMenu from './MobileNavMenu';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const location = useLocation();
  const { imgUrl } = useUserInfoChangeStore();
  const { user } = useUserStore();

  const windowWidth = useCalculateInnerWidth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onClickOutSide = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [imgUrl]);

  useEffect(() => {
    if (searchOpen || navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchOpen, navOpen]);

  useEffect(() => {
    if (windowWidth > 768) {
      setNavOpen(false);
      setSearchOpen(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    setSearchOpen(false);
    setNavOpen(false);
  }, [location]);

  const onToggleSearchBox = useCallback(() => {
    setNavOpen(false);
    setSearchOpen((prev) => !prev);
  }, []);

  const onToggleNavMenu = useCallback(() => {
    setSearchOpen(false);
    setNavOpen((prev) => !prev);
  }, []);

  const onCloseOverlay = useCallback(() => {
    if (searchOpen === true) {
      setSearchOpen(false);
    }

    if (navOpen === true) {
      setNavOpen(false);
    }
  }, [searchOpen, navOpen]);

  return (
    <>
      <header className={styles.main__header}>
        <div
          className={`${styles.header__section} ${
            navOpen || searchOpen ? styles.open : ''
          }`}
        >
          <div>
            <a href="/" className={styles.logo}>
              <img src="/logo-pokehub.png" alt="logo" />
            </a>
            <div className={styles.menu__group}>
              <SearchInput />
              <nav className={styles.nav__box}>
                <Link to="/">
                  <div className={styles.nav__item}>
                    <FaRegAddressCard size={31} />
                    도감
                  </div>
                </Link>
                <Link to="cardedit">
                  <div className={styles.nav__item}>
                    <FiPlusSquare size={31} />
                    카드 제작
                  </div>
                </Link>
                <Link to="community">
                  <div className={styles.nav__item}>
                    <MdRecordVoiceOver size={31} />
                    커뮤니티
                  </div>
                </Link>
                <div
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                  className={styles.nav__item__last}
                >
                  {user ? (
                    <div className={styles.nav__item}>
                      <div className={styles.nav__profile__img}>
                        <img
                          style={{ borderRadius: '50%' }}
                          src={user?.photoURL || undefined}
                          alt="프로필 사진"
                        />
                      </div>
                      나의 메뉴
                    </div>
                  ) : (
                    <div className={styles.nav__item}>
                      <RiLoginBoxLine size={31} />
                      로그인
                    </div>
                  )}

                  <SocialLogin isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
              </nav>
            </div>

            <MobileNav
              onToggleSearchBox={onToggleSearchBox}
              onToggleNavMenu={onToggleNavMenu}
              navOpen={navOpen}
            />
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className={styles.mobile__overlay} onClick={onCloseOverlay}>
          <MobileSearchBox isOpen={setSearchOpen} />
        </div>
      )}
      {navOpen && (
        <div className={styles.mobile__overlay} onClick={onCloseOverlay}>
          <MobileNavMenu />
        </div>
      )}
    </>
  );
};

export default Header;
