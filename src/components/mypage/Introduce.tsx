import useUserStore from '@/store/useUsersStore';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  ref,
  deleteObject,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { PROFILE_DEFAULT_IMG, STORAGE_DOWNLOAD_URL } from '@/lib/constants';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';
import { getDocument, setDocument } from '@/lib/firebaseQuery';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import DesktopIntroduce from './DesktopIntroduce';
import MobileIntroduce from './MobileIntroduce';

const Introduce = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');
  const { user } = useUserStore();
  const { userName, setUserName, imgUrl, setImgUrl } = useUserInfoChangeStore();
  const windowWidth = useCalculateInnerWidth();

  useEffect(() => {
    if (user?.photoURL) {
      setImgUrl(user?.photoURL);
    }

    if (user?.displayName) {
      setUserName(user?.displayName);
    }

    const fetchData = async () => {
      if (!user) {
        return;
      }

      try {
        const docSnap = await getDocument(`/userProfiles/${user.uid}`);
        if (docSnap) {
          setEditText(docSnap.data().introduceText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setImgUrl, setUserName, user, user?.displayName, user?.photoURL]);

  const onEditModeOn = () => {
    setEditMode(true);
  };

  const onEditModeOff = async () => {
    setIsLoading(true);
    if (!editText || userName === '') {
      console.log('닉네임이나 자기소개말이 비어있습니다.');
      setIsLoading(false);
      return;
    }

    let newImgUrl = imgUrl;

    try {
      if (imgUrl === PROFILE_DEFAULT_IMG) {
        newImgUrl = PROFILE_DEFAULT_IMG;
      } else if (imgUrl && imgUrl.startsWith('data:')) {
        const key = `${user?.uid}/${uuidv4()}`;
        const storageRef = ref(storage, key);

        if (user?.photoURL && user?.photoURL.includes(STORAGE_DOWNLOAD_URL)) {
          const imageRef = ref(storage, user?.photoURL);
          await deleteObject(imageRef).catch((error) => console.log(error));
        }

        const data = await uploadString(storageRef, imgUrl, 'data_url');
        newImgUrl = await getDownloadURL(data?.ref);
      }

      if (user) {
        await setDocument(`/userProfiles/${user.uid}`, {
          introduceText: editText,
          uid: user.uid,
        });

        await updateProfile(user, {
          displayName: userName || '',
          photoURL: newImgUrl || user?.photoURL || '',
        });
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;

    setUserName(value);
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setEditText(value);
  };

  const onProfileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setImgUrl(fileReader.result as string);
      };

      fileReader.onerror = () => {
        console.log('파일을 읽는 중 오류가 발생했습니다.');
      };

      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        const { result } = e.currentTarget as FileReader;
        setImgUrl(result as string);
      };
    } else {
      console.log('이미지 파일을 선택해주세요.');
    }
  };

  const onDeleteProfileImg = () => {
    setImgUrl(PROFILE_DEFAULT_IMG);
  };

  const props = {
    onProfileUpload,
    onDeleteProfileImg,
    onChangeUserName,
    onChangeText,
    onEditModeOn,
    onEditModeOff,
    editText,
    editMode,
    isLoading,
  };

  return (
    <>
      {windowWidth <= 768 ? (
        <MobileIntroduce props={props} />
      ) : (
        <DesktopIntroduce props={props} />
      )}
    </>
  );
};

export default Introduce;
