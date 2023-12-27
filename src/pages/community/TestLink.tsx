import { Link } from 'react-router-dom';

const TestLink = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <Link to={'/community'}>
        <button>메인</button>
      </Link>
      <Link to={'/community/detail/1'}>
        <button>상세보기</button>
      </Link>
      <Link to={'/community/add'}>
        <button>글 쓰기</button>
      </Link>
      <Link to={'/community/edit'}>
        <button>글 수정</button>
      </Link>
    </div>
  );
};

export default TestLink;
