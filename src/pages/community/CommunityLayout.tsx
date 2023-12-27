import { ReactNode } from "react";
import styles from "./CommunityLayout.module.scss"
// import TestLink from "./TestLink";

interface Props {
  children: ReactNode
}

const CommunityLayout = ({children}: Props) => {
  return (
    <div className={styles.container}>
      {children}
      {/* <TestLink /> */}
    </div>
  );
};

export default CommunityLayout;
