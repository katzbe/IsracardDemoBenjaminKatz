import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function FavouritesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Favourites Screen</Text>
      <Button
        title="Show to book details..."
        onPress={() =>
          navigation.navigate('BookDetails', {
            book: { title: 'The Lord of the Rings' },
          })
        }
      />
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
