import { FlatList, StyleSheet } from 'react-native';
import BookItem from './BookItem';
import { Book } from '../types';

type Props = {
  books: Book[];
};

export default function BooksList({ books }: Props) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={({ index }) => String(index)}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      data={books}
      renderItem={({ item }) => <BookItem book={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  contentContainerStyle: { gap: 20, padding: 20 },
});
