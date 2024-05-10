import ContentLoader from 'react-content-loader';

const StatsSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={254}
        height={35}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="5" rx="5" ry="5" width="254" height="20" />
      </ContentLoader>
    </>
  );
};

export default StatsSkeleton;
