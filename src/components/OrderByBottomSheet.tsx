import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { type BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Ionicons from '@react-native-vector-icons/ionicons';

export type OrderByOption = {
  title: string;
  value: string;
};

type Props = {
  ref: React.RefObject<BottomSheetMethods | null>;
  options: OrderByOption[];
  selectedValue: OrderByOption;
  onSelect: (option: OrderByOption) => void;
};

export default function OrderByBottomSheet({
  ref,
  options,
  selectedValue,
  onSelect,
}: Props) {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={styles.backdrop}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      style={styles.container}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {options.map(option => {
          const isSelected = option.value === selectedValue.value;
          return (
            <Pressable key={option.title} onPress={() => onSelect(option)}>
              <View style={styles.optionItemContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                  />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: { boxShadow: '2px 4px 16px rgba(0,0,0,0.5)' },
  contentContainer: {
    padding: 20,
  },
  optionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: { flex: 0.1 },
  titleContainer: { flex: 1 },
  optionTitle: {
    fontSize: 16,
    textAlign: 'left',
  },
  backdrop: { backgroundColor: 'transparent' },
});
