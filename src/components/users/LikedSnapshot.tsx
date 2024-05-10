'use client';

import { useEffect } from 'react';
import { db } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getPokemonData } from '@/lib/poketApi';
import useLikedStore from '@/store/useLikedStore';
import useUserStore from '@/store/useUsersStore';

const LikedSnapshot = () => {
  const { user } = useUserStore();
  const { setPokemonData } = useLikedStore();

  useEffect(() => {
    if (user == null) {
      return;
    }

    if (user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, 'likes', user.uid),
        async (doc) => {
          const likedPokemons = doc.data()?.pokemons || [];
          const data = await Promise.all(likedPokemons.map(getPokemonData));
          setPokemonData(data);
        },
      );

      return () => unsubscribe();
    }
  }, [user?.uid, setPokemonData, user]);
  return null;
};

export default LikedSnapshot;
