import { StyleSheet, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import BooksList from '../components/BooksList';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { Book } from '../types';
import { fetchBooks } from '../lib/api';

export default function FavoritesScreen() {
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);

  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const storedFavoriteBookIds =
          (await AsyncStorageService.getItem<number[]>(
            STORAGE_KEYS.FAVORITE_BOOKS,
          )) ?? [];

        const favouriteBooksToDisplay =
          books?.filter(book => storedFavoriteBookIds?.includes(book.number)) ??
          [];

        setFavouriteBooks(favouriteBooksToDisplay);
      })();
    }, [books]),
  );

  return (
    <View style={styles.container}>
      <BooksList books={favouriteBooks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
