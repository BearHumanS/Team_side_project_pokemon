import styles from './Comments.module.scss';

interface PaginationProps {
  hasMoreComments: boolean;
  onMoveToNext: () => void;
  isLoading: boolean;
}

const Pagination = ({
  hasMoreComments,
  onMoveToNext,
  isLoading,
}: PaginationProps) => {
  return (
    <button
      className={styles.more__btn}
      onClick={onMoveToNext}
      disabled={!hasMoreComments || isLoading}
    >
      더보기
    </button>
  );
};

export default Pagination;
