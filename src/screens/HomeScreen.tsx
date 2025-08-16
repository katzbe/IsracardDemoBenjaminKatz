import { StyleSheet, View } from 'react-native';

import BooksList from '../components/BooksList';
import books from '../data/books';

export default function HomeScreen() {
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
