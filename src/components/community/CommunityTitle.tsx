import styles from './CommunityTitle.module.scss';

interface Props {
  title: string;
}

const CommunityTitle = (item: Props) => {
  return <div className={styles.title}>{item.title}</div>;
};

export default CommunityTitle;
