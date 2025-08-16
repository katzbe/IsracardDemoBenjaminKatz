import { StaticScreenProps } from '@react-navigation/native';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Book } from '../types';
import AsyncStorageService from '../services/AsyncStorageService';
import { STORAGE_KEYS } from '../constants/storageKeys';

type Props = StaticScreenProps<{
  book: Book;
}>;

export default function BookDetailsScreen({ route }: Props) {
  const { book } = route.params;

  async function onAddFavoritePress() {
    const storedFavoriteBookIds =
      (await AsyncStorageService.getItem<number[]>(
        STORAGE_KEYS.FAVORITE_BOOKS,
      )) ?? [];
    if (storedFavoriteBookIds.includes(book.number)) {
      return;
    }
    await AsyncStorageService.setItem(STORAGE_KEYS.FAVORITE_BOOKS, [
      ...storedFavoriteBookIds,
      book.number,
    ]);

    Alert.alert('Book was successfully added to your favourites!');
  }

  async function onRemoveFavoritesPress() {
    const storedFavoriteBookIds =
      (await AsyncStorageService.getItem<number[]>(
        STORAGE_KEYS.FAVORITE_BOOKS,
      )) ?? [];
    const newFavoriteBookIds = storedFavoriteBookIds.filter(
      bookId => bookId !== book.number,
    );
    await AsyncStorageService.setItem(
      STORAGE_KEYS.FAVORITE_BOOKS,
      newFavoriteBookIds,
    );

    Alert.alert('Book was successfully removed from your favourites!');
  }

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
          <View style={{ marginTop: 'auto' }}>
            <Pressable onPress={onAddFavoritePress}>
              <Text>Add to favourite</Text>
            </Pressable>
            <Pressable onPress={onRemoveFavoritesPress}>
              <Text>Remove from favourites</Text>
            </Pressable>
          </View>
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
