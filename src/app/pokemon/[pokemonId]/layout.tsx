import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getMetadata } from '@/lib/util/getMetaData';

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: `포케허브 | 도감`,
  });
};

const DetailLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default DetailLayout;
