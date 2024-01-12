import { CSSProperties, ReactNode } from 'react';
import styles from './Inner.module.scss';

interface InnerProp {
  children: ReactNode;
  style?: CSSProperties;
}

const Inner = ({ children, style }: InnerProp) => {
  return (
    <div className={styles.inner} style={style}>
      {children}
    </div>
  );
};

export default Inner;
