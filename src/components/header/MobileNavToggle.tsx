'use client';

import { useCallback } from 'react';
import MobileSearchBox from './MobileSearchBox';
import MobileNavMenu from './MobileNavMenu';
import { useMobileNavStore } from '@/store/MobileNavState';
import styles from './Header.module.scss';

const MobileNavToggle = () => {
  const { searchOpen, setSearchOpen, navOpen, setNavOpen } =
    useMobileNavStore();

  const onCloseOverlay = useCallback(() => {
    if (searchOpen === true) {
      setSearchOpen(false);
    }

    if (navOpen === true) {
      setNavOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOpen, navOpen]);
  return (
    <>
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

export default MobileNavToggle;
