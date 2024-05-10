'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLogin from '../users/SocialLogin';
import useUserStore from '@/store/useUsersStore';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';
import { FaRegAddressCard } from '@react-icons/all-files/fa/FaRegAddressCard';
import { RiLoginBoxLine } from '@react-icons/all-files/ri/RiLoginBoxLine';
import { FiPlusSquare } from '@react-icons/all-files/fi/FiPlusSquare';
import { MdRecordVoiceOver } from '@react-icons/all-files/md/MdRecordVoiceOver';
import styles from './Header.module.scss';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserStore();
  const { imgUrl } = useUserInfoChangeStore();

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
  return (
    <nav className={styles.nav__box}>
      <Link href="/">
        <div className={styles.nav__item}>
          <FaRegAddressCard size={31} />
          도감
        </div>
      </Link>
      <Link href="/cardEdit">
        <div className={styles.nav__item}>
          <FiPlusSquare size={31} />
          카드 제작
        </div>
      </Link>
      <Link href="/community">
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
              <Image
                style={{ borderRadius: '50%' }}
                src={user?.photoURL || undefined || ''}
                alt="프로필 사진"
                width={25}
                height={25}
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
  );
};

export default NavMenu;
