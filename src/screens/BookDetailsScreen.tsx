import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Book } from '../types';

type Props = StaticScreenProps<{
  book: Book;
}>;

export default function BookDetailsScreen({ route }: Props) {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Text>Book Details Screen</Text>
      <Text>Book title: {book.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
