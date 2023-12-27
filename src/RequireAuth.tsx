import { useEffect } from 'react';
import useUserStore from './store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import { childrenProps } from './lib/type';

const RequireAuth = ({ children }: childrenProps) => {
  const { user, isLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      console.log('asgdasd');
      navigate('/', { replace: true });
    }
  }, [user, navigate, isLoading]);
  return user ? children : null;
};

export default RequireAuth;
