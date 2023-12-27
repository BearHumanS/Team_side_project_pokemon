/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/firebase';
import {
  doc,
  addDoc,
  deleteDoc,
  collection,
  updateDoc,
} from 'firebase/firestore';

interface DataObject {
  views?: number,
  likes?: number,
  title?: string;
  postId?: string;
  userId?: string;
  userImg?: string;
  postImg?: string;
  category?: string;
  createdAt?: string;
  updateAt?: string;
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

export const editCommunity = async (communityPath: string, data: { [x: string]: any }) => {
  const ref = doc(db, communityPath);
  await updateDoc(ref, data);
};

export const addComment = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};

export const addReplies = async (communityPath: string, data: DataObject) => {
  const ref = collection(db, communityPath);
  await addDoc(ref, data);
};
