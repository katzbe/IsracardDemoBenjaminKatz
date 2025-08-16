import { StyleSheet, View } from 'react-native';
import { useCallback, useState } from 'react';

import BooksList from '../components/BooksList';
import mockBooks from '../data/books';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { Book } from '../types';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [books, setBooks] = useState<Book[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const storedFavoriteBookIds =
          (await AsyncStorageService.getItem<number[]>(
            STORAGE_KEYS.FAVORITE_BOOKS,
          )) ?? [];

        const favouriteBooksToDisplay = mockBooks.filter(book =>
          storedFavoriteBookIds.includes(book.number),
        );

        setBooks(favouriteBooksToDisplay);
      })();
    }, []),
  );

  return (
    <View style={styles.container}>
      <BooksList books={books} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
