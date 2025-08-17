import { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function OrderBy() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => bottomSheetRef.current?.expand()}>
        <View style={styles.inner}>
          <Ionicons name="swap-vertical" size={26} />
        </View>
      </Pressable>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, cum
            exercitationem ullam quisquam est eaque. Eveniet dolorem quo eaque
            quaerat est optio officiis omnis, neque quibusdam repellendus, quae
            dolor nam! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloribus vero omnis in quae ipsam, culpa temporibus ea sequi ad
            cupiditate fugiat ratione, ducimus alias id veritatis soluta fugit
            atque consectetur. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Excepturi provident consequuntur molestiae, id
            doloremque dolore ipsa culpa ut, animi maiores sit quaerat
            consequatur, nostrum aut. Tenetur, dolorum? Distinctio, ex nihil.
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
