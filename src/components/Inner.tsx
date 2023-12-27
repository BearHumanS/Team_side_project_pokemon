import { ReactNode } from 'react';
import styles from './Inner.module.scss';

interface InnerProp {
  children: ReactNode;
}

const Inner = ({ children }: InnerProp) => {
  return <div className={styles.inner}>{children}</div>;
};

export default Inner;
