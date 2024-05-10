import Image from 'next/image';
import SearchInput from '@/components/search/Search';
import MobileNavUI from '@/components/header/MobileNavUI';
import MobileNavToggle from '@/components/header/MobileNavToggle';
import NavMenu from '@/components/header/NavMenu';
import styles from '@/components/header/Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.main__header}>
        <div className={styles.header__section}>
          <div>
            <div className={styles.logo}>
              <a href="/">
                <Image
                  src="/logo-pokehub.png"
                  alt="logo"
                  width={132}
                  height={59}
                />
              </a>
            </div>
            <div className={styles.menu__group}>
              <SearchInput />
              <NavMenu />
            </div>

            <MobileNavUI />
          </div>
        </div>
      </header>

      <MobileNavToggle />
    </>
  );
};

export default Header;
