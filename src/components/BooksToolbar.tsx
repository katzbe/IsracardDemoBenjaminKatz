import { Pressable, StyleSheet, Text, View } from 'react-native';

import SearchBar from './SearchBar';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  searchQuery: string;
  orderedBy: string;
  onQueryChange: (text: string) => void;
  onOrderByPress: () => void;
};

export default function BooksToolbar({
  orderedBy,
  searchQuery,
  onQueryChange,
  onOrderByPress,
}: Props) {
  return (
    <View style={style.container}>
      <SearchBar value={searchQuery} onChange={onQueryChange} />
      <Pressable onPress={onOrderByPress}>
        <View style={style.orderByContainer}>
          <Ionicons name="swap-vertical" size={26} />
          <Text>Ordered by: {orderedBy}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: { boxShadow: '2px 4px 16px rgba(0,0,0,0.1)' },
  orderByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
  },
});
