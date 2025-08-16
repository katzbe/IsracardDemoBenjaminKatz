import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={26} />
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholder="Search books..."
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChange('')}>
            <Ionicons name="close-circle" size={26} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    boxShadow: '2px 4px 16px rgba(0,0,0,0.1)',
  },
  inputContainer: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
});
