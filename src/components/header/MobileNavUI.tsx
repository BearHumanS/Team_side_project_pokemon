'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import { MobileMenuBtn } from './MobileMenuBtn';
import { IoSearchSharp } from '@react-icons/all-files/io5/IoSearchSharp';
import styles from './Header.module.scss';
import { useMobileNavStore } from '@/store/MobileNavState';

const MobileNav = () => {
  const { searchOpen, setSearchOpen, navOpen, setNavOpen } =
    useMobileNavStore();

  const pathName = usePathname();

  const windowWidth = useCalculateInnerWidth();

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
  }, [setNavOpen, setSearchOpen, windowWidth]);

  useEffect(() => {
    setSearchOpen(false);
    setNavOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const onToggleSearchBox = useCallback(() => {
    setNavOpen(false);
    setSearchOpen((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleNavMenu = useCallback(() => {
    setSearchOpen(false);
    setNavOpen((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.menu__group__mobile}>
      {pathName === '/' && (
        <div onClick={onToggleSearchBox}>
          <IoSearchSharp size={18} />
        </div>
      )}

      {windowWidth <= 768 && (
        <div onClick={onToggleNavMenu}>
          <MobileMenuBtn isOpen={navOpen} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
