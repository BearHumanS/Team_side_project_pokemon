import { ReactNode } from 'react';

import styles from '@/components/users/SocialLogin.module.scss';

const MobileSocialLogin = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.mobile__container}>
      <div className={styles.mobile__overlay}>
        <div className={styles.mobile__contents}>{children}</div>
      </div>
    </div>
  );
};

export default MobileSocialLogin;
