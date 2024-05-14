import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getMetadata } from '@/lib/util/getMetaData';
import RequiredAuth from '@/app/RequiredAuth';

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: `포케허브 | 카드제작`,
  });
};

const CardEditLayout = ({ children }: PropsWithChildren) => {
  return (
    <RequiredAuth>
      <div>{children}</div>
    </RequiredAuth>
  );
};

export default CardEditLayout;
