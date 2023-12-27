import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('잘못된 경로임.');
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Redirect;
