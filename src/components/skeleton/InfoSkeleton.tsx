import ContentLoader from 'react-content-loader';

const InfoSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={199.69}
        height={16}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="199.69" height="16" />
      </ContentLoader>
    </>
  );
};

export default InfoSkeleton;
