import { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth } from '@firebase/auth';
import { app } from '@/firebase';
import Layout from '@/components/Layout';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';
import RequireAuth from './RequireAuth';
import Redirect from './Redirect';
import LikedSnapshot from './components/users/LikedSnapshot';

const DEX = lazy(() => import('@/pages/dex/Dex'));
const Detail = lazy(() => import('@/pages/detail/detail'));
const MyPage = lazy(() => import('@/pages/mypage/myPage'));
const Card = lazy(() => import('@/pages/card/card'));
const CommunityPage = lazy(() => import('@/pages/community/CommunityPage'));
const DetailPage = lazy(() => import('@/pages/community/DetailPage'));
const PostAddPage = lazy(() => import('@/pages/community/PostAddPage'));
const PostEditPage = lazy(() => import('@/pages/community/PostEditPage'));

const App = () => {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, [auth]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LikedSnapshot />
        {init && (
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DEX />} />
              <Route path="/pokemon/:id" element={<Detail />} />
              <Route
                path="/mypage"
                element={
                  <RequireAuth>
                    <MyPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/cardedit"
                element={
                  <RequireAuth>
                    <Card />
                  </RequireAuth>
                }
              />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/detail/:id" element={<DetailPage />} />
              <Route
                path="/community/add"
                element={
                  <RequireAuth>
                    <PostAddPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/community/edit"
                element={
                  <RequireAuth>
                    <PostEditPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<Redirect />} />
          </Routes>
        )}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
