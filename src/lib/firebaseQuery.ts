import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { filteredPokemonData } from './type';

interface DataObject {
  comment?: string;
  createdAt?: string;
  displayName?: string | null;
  uid?: string;
  introduceText?: string;
  pokemons?: string;
  pokemonCardData?: (string | filteredPokemonData | null)[];
}

export const addDocument = async (collectionPath: string, data: DataObject) => {
  const ref = collection(db, collectionPath);
  await addDoc(ref, data);
};

export const deleteDocument = async (documentPath: string) => {
  const ref = doc(db, documentPath);
  await deleteDoc(ref);
};

export const updateDocument = async (
  collectionPath: string,
  data: { [x: string]: any },
) => {
  const ref = doc(db, collectionPath);
  await updateDoc(ref, data);
};

export const getDocument = async (documentPath: string) => {
  const ref = doc(db, documentPath);
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? docSnap : undefined;
};

export const setDocument = async (documentPath: string, data: DataObject) => {
  const ref = doc(db, documentPath);
  await setDoc(ref, data);
};

export const getAllDocument = async (collectionPath: string) => {
  const ref = collection(db, collectionPath);

  const refQuery = query(ref, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(refQuery);

  const documents = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return documents;
};

export const getCountDocument = async (collectionPath: string) => {
  const ref = collection(db, collectionPath);
  const countResult = await getCountFromServer(ref);
  return countResult.data().count;
};
