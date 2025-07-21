import { Feather } from '@expo/vector-icons';
import { Location, PlanItem } from '@trip-check/types';
import { formatTime } from '@trip-check/utils';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  planItem: PlanItem;
  location: Location; // 名前などを表示するために必要
  onEdit?: () => void;
};

export default function PlanItemCard({ planItem, location, onEdit }: Props) {
  return (
    <View style={styles.card}>
      {/* タイトル & Edit */}
      <View style={styles.header}>
        <Text style={styles.title}>{location.name}</Text>
        {onEdit && (
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={16} color="gray" />
            <Text style={styles.editText} onPress={onEdit}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 時間 & メモ */}
      <View style={styles.row}>
        <Text style={styles.time}>
          {formatTime(planItem.locationStartDate)} 〜 {formatTime(planItem.locationEndDate)}
        </Text>
      </View>

      <Text />

      {/* 説明 */}
      {planItem.description ? <Text style={styles.note}>{planItem.description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  editText: { color: 'gray', fontSize: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  time: { fontSize: 14 },
  memo: { fontSize: 14, color: 'gray' },
  note: { fontSize: 14, marginTop: 4 },
});
