import { MouseEvent, useEffect } from 'react';
import { app } from '@/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import styles from './SocialLogin.module.scss';
import useUserStore from '@/store/useUsersStore';
import { useNavigate } from 'react-router-dom';

interface SocialLoginProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialLogin = ({ isOpen, setIsOpen }: SocialLoginProps) => {
  const auth = getAuth(app);

  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserSessionPersistence);
      } catch (error) {
        console.error(error);
      }
    };

    setAuthPersistence();
  }, [auth]);

  const onlLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    let name = target.name;

    if (!name) {
      const button = target.closest('button');
      name = button ? button.name : '';
    }

    let provider;

    if (name === 'google') {
      provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    } else {
      console.error('지원하지 않는 로그인 방식입니다.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      setIsOpen(false);
      console.log('로그인 성공:', result);
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('로그아웃');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const onMoveMyPage = () => {
    navigate('/mypage');
  };

  return (
    <>
      {user ? (
        <>
          <div className={styles.socialLogin}>
            <div className={styles.socialLogin__loginButton}>내 정보</div>
            <div
              className={`${styles.socialLogin__dropdown} ${
                isOpen ? styles.socialLogin__dropdown__visible : ''
              }`}
            >
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__mypage}
                onClick={onMoveMyPage}
              >
                마이페이지
              </button>
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__logout}
                onClick={onLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.socialLogin}>
            <div className={styles.socialLogin__loginButton}>로그인</div>
            <div
              className={`${styles.socialLogin__dropdown} ${
                isOpen ? styles.socialLogin__dropdown__visible : ''
              }`}
            >
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__google}
                name="google"
                onClick={onlLogin}
              >
                <img
                  className={styles.socialLogin__icon}
                  src="/socialLoginIcons/google_icon.svg"
                  alt="구글 로그인"
                />
                <span>구글 로그인 </span>
              </button>
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__github}
                name="github"
                onClick={onlLogin}
              >
                <img
                  className={styles.socialLogin__icon}
                  src="/socialLoginIcons/github_icon.svg"
                  alt="깃허브 로그인"
                />
                <span>깃허브 로그인</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SocialLogin;
