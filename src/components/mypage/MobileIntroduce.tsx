import { ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './Mypage.module.scss';
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';

interface DesktopIntroduceProps {
  props: {
    onProfileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    onDeleteProfileImg: () => void;
    onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onEditModeOn: () => void;
    onEditModeOff: () => void;
    editText: string;
    editMode: boolean;
    isLoading: boolean;
  };
}

const MobileIntroduce = ({ props }: DesktopIntroduceProps) => {
  const { imgUrl, userName } = useUserInfoChangeStore();

  const {
    onProfileUpload,
    onDeleteProfileImg,
    onChangeUserName,
    onChangeText,
    onEditModeOn,
    onEditModeOff,
    editText,
    editMode,
    isLoading,
  } = props;

  return (
    <div className={styles.intro__container}>
      <div className={styles.intro__profile__img}>
        <Image
          src={imgUrl || PROFILE_DEFAULT_IMG}
          alt="프로필 이미지"
          width={80}
          height={80}
          priority
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
              <IoCloseSharp size={18} color="#fff" />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.intro__info}>
        <div
          className={`${styles.intro__info__name} ${
            editMode ? '' : styles.editModeOff
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
      <div
        className={`${styles.intro__info__edit} ${
          editMode ? styles.editModeOn : ''
        }`}
      >
        <button
          type="button"
          className={`${styles.intro__info__edit__btn} ${
            editMode ? styles.editModeOn : styles.editModeOff
          }`}
          onClick={editMode ? onEditModeOff : onEditModeOn}
          disabled={isLoading}
        >
          <span>{editMode ? '저장' : '편집'}</span>
        </button>
      </div>
    </div>
  );
};

export default MobileIntroduce;
