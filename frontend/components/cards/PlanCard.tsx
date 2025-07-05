import { AntDesign } from '@expo/vector-icons';
import { Plan } from '@trip-check/types';
import { formatJapaneseDate } from '@trip-check/utils';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Props = {
  plan: Plan | null;
};

const advisabilityIconRender = useCallback((advisability: boolean) => {
  if (advisability) {
    return <AntDesign name="checkcircle" size={24} color="green" />;
  }
  return <AntDesign name="warning" size={24} color="red" />;
}, []);

export function PlanCard({ plan }: Props) {
  if (!plan) {
    return <></>;
  }
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: plan.imageUrl }} />
      <Card.Title title={plan.name} style={styles.cardTitle} subtitle={plan?.description} />
      <Card.Content style={styles.cardContent}>
        <Text variant="bodySmall" style={styles.cardDate}>
          {formatJapaneseDate(plan.startDate)} - {formatJapaneseDate(plan.endDate)}
        </Text>
        {/* アイコン：右寄せ */}
        {advisabilityIconRender(plan.advisability)}
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
    padding: 12,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDate: {
    color: '#666',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRight: {
    marginRight: 8,
  },
});
