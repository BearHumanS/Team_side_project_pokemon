import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import ContentLoader from 'react-content-loader';

const DetailImgSkeleton = () => {
  const windowWidth = useCalculateInnerWidth();
  return (
    <>
      <ContentLoader
        speed={2}
        width={windowWidth <= 768 ? 204 : 280}
        height={windowWidth <= 768 ? 204 : 280}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect
          x="0"
          y="0"
          rx="2"
          ry="2"
          width={windowWidth <= 768 ? 204 : 280}
          height={windowWidth <= 768 ? 204 : 280}
        />
      </ContentLoader>
    </>
  );
};

export default DetailImgSkeleton;
