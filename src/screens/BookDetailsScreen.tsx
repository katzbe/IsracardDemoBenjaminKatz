import { useEffect, useState } from 'react';
import { StaticScreenProps } from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { Book } from '../types';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';

type Props = StaticScreenProps<{
  book: Book;
}>;

export default function BookDetailsScreen({ route }: Props) {
  const { book } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  async function onFavoritePress() {
    const storedFavoriteBookIds =
      (await AsyncStorageService.getItem<number[]>(
        STORAGE_KEYS.FAVORITE_BOOKS,
      )) ?? [];
    if (storedFavoriteBookIds.includes(book.number)) {
      await AsyncStorageService.setItem(
        STORAGE_KEYS.FAVORITE_BOOKS,
        storedFavoriteBookIds.filter(bookId => bookId !== book.number),
      );
      setIsFavorite(false);
      return;
    }
    await AsyncStorageService.setItem(STORAGE_KEYS.FAVORITE_BOOKS, [
      ...storedFavoriteBookIds,
      book.number,
    ]);
    setIsFavorite(true);
  }

  useEffect(() => {
    (async () => {
      const storedFavoriteBookIds =
        (await AsyncStorageService.getItem<number[]>(
          STORAGE_KEYS.FAVORITE_BOOKS,
        )) ?? [];

      const isFavoriteBook = !!storedFavoriteBookIds.find(
        bookId => bookId === book.number,
      );

      setIsFavorite(isFavoriteBook);
    })();
  }, [book]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: book.cover }}
          />
        </View>
        <View style={styles.bookDetailsContainer}>
          <Text numberOfLines={3} style={styles.bookTitleText}>
            {book.title}
          </Text>
          <Text>Released on {book.releaseDate}</Text>
          <Text>Total pages: {book.pages}</Text>
          <Pressable style={styles.favouriteButton} onPress={onFavoritePress}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={36}
              color="#900"
            />
          </Pressable>
        </View>
      </View>
      <Text style={styles.descriptionText}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  headingContainer: {
    height: 200,
    flexDirection: 'row',
    marginBottom: 40,
  },
  imageContainer: { flex: 0.4, boxShadow: '2px 4px 16px rgba(0,0,0,0.4)' },
  image: { flex: 1 },
  bookDetailsContainer: { flex: 0.7, paddingLeft: 20 },
  bookTitleText: { fontWeight: '700', fontSize: 16, marginBottom: 20 },
  descriptionText: {
    fontSize: 18,
    textAlign: 'justify',
  },
  favouriteButton: { position: 'absolute', left: 20, bottom: 0 },
});
