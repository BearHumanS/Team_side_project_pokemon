import ContentLoader from 'react-content-loader';

const TypeSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={95}
        height={61}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="16" ry="16" width="95" height="33" />
      </ContentLoader>
    </>
  );
};

export default TypeSkeleton;
