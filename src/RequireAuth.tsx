import { useEffect } from 'react';
import useUserStore from './store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import { childrenProps } from './lib/type';

const RequireAuth = ({ children }: childrenProps) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('로그인 해주세요.');
      navigate('/');
    }
  }, [user, navigate]);
  return user ? children : null;
};

export default RequireAuth;
