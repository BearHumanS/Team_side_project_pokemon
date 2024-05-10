import { db } from '@/firebase';
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

interface DataObject {
  uid?: string;
  views?: number;
  likes?: string[];
  title?: string;
  postId?: string;
  userId?: string;
  userImg?: string;
  postImg?: string;
  category?: string;
  updateAt?: string;
  createdAt?: string;
  communitys?: string;
  description?: string;
  userName?: string | null;
}

export const addCommunity = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const deleteCommunity = async (communityPath: string) => {
  const ref = doc(db, communityPath);
  await deleteDoc(ref);
};

export const editCommunity = async (
  communityPath: string,
  data: { [x: string]: any },
) => {
  const ref = doc(db, communityPath);
  await updateDoc(ref, data);
};

export const addComment = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const editComment = async (
  communityPath: string,
  data: { [x: string]: any },
) => {
  const ref = doc(db, communityPath);
  await updateDoc(ref, data);
};

export const addReplies = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const editReplies = async (
  communityPath: string,
  data: { [x: string]: any },
) => {
  const ref = doc(db, communityPath);
  await updateDoc(ref, data);
};

export const getDocument = async (documentPath: string) => {
  const ref = doc(db, documentPath);
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? docSnap : undefined;
};

export const setDocument = async (documentPath: string, data: DataObject) => {
  const ref = doc(db, documentPath);
  await setDoc(ref, data, { merge: true });
};

export const deleteDocument = async (communityPath: string) => {
  const ref = doc(db, communityPath);
  await deleteDoc(ref);
};

export const viewCount = async (
  communityPath: string,
  data: { [x: string]: any },
) => {
  const ref = doc(db, communityPath);
  await updateDoc(ref, data);
};
