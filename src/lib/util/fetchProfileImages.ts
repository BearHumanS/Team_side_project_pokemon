import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

const FetchProfileImages = async (userId: string) => {
  if (!userId) return [];
  const fileRef = ref(storage, `${userId}`); // fileRef의 타입을 명시적으로 지정
  const result = await listAll(fileRef);
  const valData = await Promise.all(
    result.items.map(async (item) => await getDownloadURL(item)),
  );
  return valData;
};

export { FetchProfileImages };
