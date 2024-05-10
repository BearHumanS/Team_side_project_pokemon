import { ReactNode } from 'react';
import styles from './CommunityLayout.module.scss';

interface Props {
  children: ReactNode;
}

const CommunityLayout = ({ children }: Props) => {
  return <section className={styles.container}>{children}</section>;
};

export default CommunityLayout;
