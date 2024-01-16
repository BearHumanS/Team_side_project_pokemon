import useUserStore from '@/store/useUsersStore';
import styles from './Mypage.module.scss';
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
import { IoIosCloseCircle } from '@react-icons/all-files/io/IoIosCloseCircle';

const Introduce = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');
  const { user } = useUserStore();
  const { userName, setUserName, imgUrl, setImgUrl } = useUserInfoChangeStore();

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

  return (
    <div className={styles.intro__container}>
      <div className={styles.intro__profile__img}>
        <img
          src={imgUrl || PROFILE_DEFAULT_IMG}
          alt="프로필 이미지"
          width={162}
          height={162}
        />
        {editMode ? (
          <>
            <label className={styles.intro__profile__img__edit}>
              이미지
              <br />
              변경하기
              <input type="file" accept="image/*" onChange={onProfileUpload} />
            </label>
            <button type="button" onClick={onDeleteProfileImg}>
              <IoIosCloseCircle size="24" />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.intro__info}>
        <div
          className={`${styles.intro__info__name} ${
            editMode ? styles.editModeOn : styles.editModeOff
          }`}
        >
          {editMode ? (
            <>
              <input
                type="text"
                value={userName as string}
                onChange={onChangeUserName}
                placeholder="최대 8글자입니다."
                maxLength={8}
                required
              />
            </>
          ) : (
            <>{userName}</>
          )}
        </div>
        <div
          className={`${styles.intro__info__talk} ${
            editMode ? styles.editModeOn : styles.editModeOff
          }`}
        >
          {editMode ? (
            <>
              <textarea
                value={editText}
                onChange={onChangeText}
                placeholder="최대 300자 입니다."
                maxLength={300}
                required
              />
              <div>{editText.length} / 300</div>
            </>
          ) : (
            <>{editText}</>
          )}
        </div>
      </div>
      <div className={styles.intro__info__edit}>
        <button
          type="button"
          className={`${styles.intro__info__edit__btn} ${
            editMode ? styles.editModeOn : styles.editModeOff
          }`}
          onClick={editMode ? onEditModeOff : onEditModeOn}
          disabled={isLoading}
        >
          <span>{editMode ? '저장하기' : '프로필 편집'}</span>
        </button>
      </div>
    </div>
  );
};

export default Introduce;
