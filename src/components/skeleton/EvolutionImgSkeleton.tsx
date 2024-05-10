import ContentLoader from 'react-content-loader';

const EvolutionImgSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={226}
        height={260}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="17" ry="17" width="226" height="226" />
        <rect x="101" y="244" rx="2" ry="2" width="46" height="16" />
      </ContentLoader>
    </>
  );
};

export default EvolutionImgSkeleton;
