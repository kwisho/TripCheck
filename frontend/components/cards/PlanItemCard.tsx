import { Location, PlanItem } from '@trip-check/types';
import { formatTime } from '@trip-check/utils';
import { StyleSheet, Text, View } from 'react-native';

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
          <Text style={styles.editText} onPress={onEdit}>
            Edit
          </Text>
        )}
      </View>

      {/* 時間 & メモ */}
      <View style={styles.row}>
        <Text style={styles.time}>
          {formatTime(planItem.locationStartDate)} 〜 {formatTime(planItem.locationEndDate)}
        </Text>
      </View>

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
