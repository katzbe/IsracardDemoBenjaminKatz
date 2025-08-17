import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type BottomSheet from '@gorhom/bottom-sheet';

import BooksList from '../components/BooksList';
import { fetchBooks } from '../lib/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingIndicator } from '../components/LoadingIndicator';
import OrderByBottomSheet from '../components/OrderByBottomSheet';
import BooksToolbar from '../components/BooksToolbar';

const ORDER_BY_OPTIONS = [
  { title: 'Title ↑', value: 'title-asc' },
  { title: 'Title ↓', value: 'title-desc' },
  { title: 'Pages ↑', value: 'pages-asc' },
  { title: 'Pages ↓', value: 'pages-desc' },
  { title: 'Release date ↑', value: 'release-date-asc' },
  { title: 'Release date ↓', value: 'release-date-desc' },
];

export default function HomeScreen() {
  const {
    isPending,
    error,
    data: books,
  } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedOrderByValue, setSelectedOrderByValue] = useState(
    ORDER_BY_OPTIONS[0],
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (isPending) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!books) return null;

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <BooksToolbar
        orderedBy={selectedOrderByValue.title}
        searchQuery={query}
        onQueryChange={setQuery}
        onOrderByPress={() => bottomSheetRef.current?.expand()}
      />
      {filteredBooks.length > 0 ? (
        <BooksList books={filteredBooks} />
      ) : (
        <Text style={styles.emptyText}>No books found</Text>
      )}
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
  container: { flex: 1 },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
