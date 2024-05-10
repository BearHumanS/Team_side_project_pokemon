import { CommentProps } from '@/components/comment/Comments';
import { useEffect, useState } from 'react';
import {
  QueryDocumentSnapshot,
  DocumentData,
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';
import { db } from '@/firebase';

const usePagination = (collectionPath: string, pageSize: number) => {
  const [dataList, setDataList] = useState<CommentProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [nextDocument, setNextDocument] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    setDataList([]);
    setNextDocument(null);
    setHasMoreData(true);
  }, [collectionPath]);

  const fetchData = async (pageCursor?: string) => {
    setIsLoading(true);
    const collRef = collection(db, collectionPath);
    let q;
    if (pageCursor === 'next' && nextDocument) {
      q = query(
        collRef,
        orderBy('createdAt', 'desc'),
        startAfter(nextDocument),
        limit(pageSize),
      );
    } else {
      q = query(collRef, orderBy('createdAt', 'desc'), limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CommentProps[];

    const newData = fetchedData.filter(
      (newItem) => !dataList.some((item) => item.id === newItem.id),
    );

    setDataList((prev) =>
      [...prev, ...newData].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );

    setNextDocument(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
    setIsLoading(false);
    setHasMoreData(querySnapshot.docs.length === pageSize);
  };

  return { dataList, setDataList, fetchData, isLoading, hasMoreData };
};

export default usePagination;
