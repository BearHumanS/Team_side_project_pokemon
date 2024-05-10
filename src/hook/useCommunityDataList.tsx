import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase'; // Firebase 설정 파일의 경로에 따라 수정

const useCommunityDataList = (val: string) => {
  const [dataList, setDataList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [repliesList, setRepliesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, val);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const data: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataList(data);
        setCommentsList(data);
        setRepliesList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return { dataList, commentsList, repliesList, setDataList };
};

export default useCommunityDataList;
