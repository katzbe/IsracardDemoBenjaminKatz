import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import BooksList from '../components/BooksList';
import { fetchBooks } from '../lib/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingIndicator } from '../components/LoadingIndicator';
import SearchBar from '../components/SearchBar';

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
      <SearchBar value={query} onChange={setQuery} />
      {filteredBooks.length > 0 ? (
        <BooksList books={filteredBooks} />
      ) : (
        <Text style={styles.emptyText}>No books found</Text>
      )}
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
