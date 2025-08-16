import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Book } from '../types';

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('BookDetails', { book })}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{ uri: book.cover }}
              style={styles.image}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={3} style={styles.title}>
              {book.title}
            </Text>
            <Text>Released on {book.releaseDate}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    borderRadius: 10,
    boxShadow: '2px 4px 16px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: { flex: 1 },
  image: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: { fontWeight: '700' },
});
