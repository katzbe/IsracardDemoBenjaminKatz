import { StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import BooksList from '../components/BooksList';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { Book } from '../types';
import { fetchBooks } from '../lib/api';
import BooksToolbar from '../components/BooksToolbar';
import OrderByBottomSheet from '../components/OrderByBottomSheet';
import type BottomSheet from '@gorhom/bottom-sheet';

const ORDER_BY_OPTIONS = [
  { title: 'Title ↑', value: 'title-asc' },
  { title: 'Title ↓', value: 'title-desc' },
  { title: 'Pages ↑', value: 'pages-asc' },
  { title: 'Pages ↓', value: 'pages-desc' },
  { title: 'Release date ↑', value: 'release-date-asc' },
  { title: 'Release date ↓', value: 'release-date-desc' },
];

export default function FavoritesScreen() {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedOrderByValue, setSelectedOrderByValue] = useState(
    ORDER_BY_OPTIONS[0],
  );

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

  const filteredBooks = favouriteBooks.filter(
    book =>
      book.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <BooksToolbar
        searchQuery={query}
        onQueryChange={setQuery}
        onOrderByPress={() => bottomSheetRef.current?.expand()}
        orderedBy={selectedOrderByValue.title}
      />
      <BooksList books={filteredBooks} />
      <OrderByBottomSheet
        ref={bottomSheetRef}
        onSelect={setSelectedOrderByValue}
        options={ORDER_BY_OPTIONS}
        selectedValue={selectedOrderByValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
