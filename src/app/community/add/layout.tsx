import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getMetadata } from '@/lib/util/getMetaData';
import RequiredAuth from '@/app/RequiredAuth';

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: `포케허브 | 게시물 작성`,
  });
};

const AddLayout = ({ children }: PropsWithChildren) => {
  return (
    <RequiredAuth>
      <div>{children}</div>
    </RequiredAuth>
  );
};

export default AddLayout;
