import ContentLoader from 'react-content-loader';

const DetailImgSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={280}
        height={280}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="2" ry="2" width="280" height="280" />
      </ContentLoader>
    </>
  );
};

export default DetailImgSkeleton;
