import styles from './CommunityDetailLayout.module.scss';
import { ReactNode } from 'react';

interface Prop {
  children: ReactNode;
}

const CommunityDetailLayout = ({ children }: Prop) => {
  return <div className={styles.container}>{children}</div>;
};

export default CommunityDetailLayout;
