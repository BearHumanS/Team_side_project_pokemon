'use client';

import { useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import { useRouter } from 'next/navigation';
import { childrenProps } from '@/lib/type';

const RequiredAuth = ({ children }: childrenProps) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      alert('로그인 해주세요.');
      router.replace('/');
    }
  }, [user, router]);
  return user ? children : null;
};

export default RequiredAuth;
