// useAuthState.ts 수정
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';
import useUserStore from '@/store/useUsersStore';

const useAuthState = () => {
  const auth = getAuth(app);
  const { setUser, setLoading } = useUserStore();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [auth, setUser, setLoading]);

  return null;
};

export default useAuthState;
