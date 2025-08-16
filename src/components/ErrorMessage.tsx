import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
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
