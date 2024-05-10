import { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import SelectLogin from './SelectLogin';
import SelectMyInfo from './SelectMyInfo';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import MobileLogin from './MobileLogin';
import MobileUserInfo from './MobileUserInfo';

interface SocialLoginProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const SocialLogin = ({ isOpen, setIsOpen }: SocialLoginProps) => {
  const auth = getAuth(app);

  const { user, setUser } = useUserStore();
  const windowWidth = useCalculateInnerWidth();
  const router = useRouter();

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

  const onLogin = async (e: MouseEvent<HTMLButtonElement>) => {
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
      if (setIsOpen) {
        setIsOpen(false);
      }
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
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const onMoveMyPage = () => {
    router.push('/mypage');
  };

  return (
    <>
      {user ? (
        <>
          <div className={styles.socialLogin}>
            {windowWidth <= 768 ? (
              <MobileUserInfo
                isOpen={isOpen}
                onMoveMyPage={onMoveMyPage}
                onLogout={onLogout}
              />
            ) : (
              <SelectMyInfo
                isOpen={isOpen}
                onMoveMyPage={onMoveMyPage}
                onLogout={onLogout}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.socialLogin}>
            {windowWidth <= 768 ? (
              <MobileLogin isOpen={isOpen} onLogin={onLogin} />
            ) : (
              <SelectLogin isOpen={isOpen} onLogin={onLogin} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SocialLogin;
