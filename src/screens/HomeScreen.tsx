import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import BooksList from '../components/BooksList';
import { fetchBooks } from '../lib/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingIndicator } from '../components/LoadingIndicator';

export default function HomeScreen() {
  const {
    isPending,
    error,
    data: books,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks });

  if (isPending) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!books) return null;

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
