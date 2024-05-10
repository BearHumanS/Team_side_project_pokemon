import { MouseEvent } from 'react';
import Image from 'next/image';
import styles from './SocialLogin.module.scss';

const SelectLogin = ({
  isOpen,
  onLogin,
}: {
  isOpen?: boolean;
  onLogin: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div
      className={`${styles.socialLogin__dropdown} ${
        isOpen ? styles.socialLogin__dropdown__visible : ''
      }`}
    >
      <div className={styles.socialLogin__dropdown__button__box}>
        <button
          type="button"
          className={styles.socialLogin__dropdown__button__google}
          name="google"
          onClick={onLogin}
        >
          <Image
            className={styles.socialLogin__icon}
            src="/socialLoginIcons/google_icon.svg"
            alt="구글 로그인"
            width={20}
            height={20}
          />
          <span>구글 로그인 </span>
        </button>
        <button
          type="button"
          className={styles.socialLogin__dropdown__button__github}
          name="github"
          onClick={onLogin}
        >
          <Image
            className={styles.socialLogin__icon}
            src="/socialLoginIcons/github_icon.svg"
            alt="깃허브 로그인"
            width={20}
            height={20}
          />
          <span>깃허브 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default SelectLogin;
