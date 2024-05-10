'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';
import useUserStore from '@/store/useUsersStore';

const AuthGurad = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app);
  const [init, setInit] = useState(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setInit(true);
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  if (!init) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGurad;
