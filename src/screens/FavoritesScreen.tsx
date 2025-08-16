import { StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import BooksList from '../components/BooksList';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { Book } from '../types';
import { fetchBooks } from '../lib/api';
import SearchBar from '../components/SearchBar';

export default function FavoritesScreen() {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

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

  const filteredBooks = favouriteBooks.filter(book =>
    book.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <BooksList books={filteredBooks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
