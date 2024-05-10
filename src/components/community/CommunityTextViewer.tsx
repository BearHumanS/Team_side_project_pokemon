import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const CommunityTextViewer = ({ data }: any) => {
  const content = data.description;
  return (
    <div>
      {content && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            style={{
              marginTop: '30px',
              whiteSpace: 'pre-wrap',
            }}
          />
        </>
      )}
    </div>
  );
};

export default CommunityTextViewer;
