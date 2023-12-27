import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Suspense, useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Header />
      <Suspense fallback={'로딩 중~~~'}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
