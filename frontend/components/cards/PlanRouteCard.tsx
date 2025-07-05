import { MaterialIcons } from '@expo/vector-icons';
import { RouteSegment, TransportType } from '@trip-check/types';
import { formatTime } from '@trip-check/utils';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  routeSegment: RouteSegment;
  onEdit: () => void;
};

export default function PlanRouteCard({ routeSegment, onEdit }: Props) {
  const renderTransportIcon = useCallback((transportType: TransportType) => {
    switch (transportType) {
      case 'DRIVING':
        return <MaterialIcons name="directions-car" size={20} />;
      case 'WALKING':
        return <MaterialIcons name="directions-walk" size={20} />;
      case 'BICYCLING':
        return <MaterialIcons name="directions-bike" size={20} />;
      case 'TRANSIT':
        return <MaterialIcons name="directions-transit" size={20} />;
      default:
        return null;
    }
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          {/* 交通手段 */}
          <View style={styles.transportRow}>
            {renderTransportIcon(routeSegment.transportType)}
            <Text style={styles.transportText}>{routeSegment.transportType}</Text>
          </View>

          {/* 出発〜到着 */}
          <Text style={styles.time}>出発 {formatTime(routeSegment.departureTime as Date)}</Text>
          <Text style={styles.arrow}>↓</Text>
          <Text style={styles.time}>到着 {formatTime(routeSegment.arrivalTime as Date)}</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.cost}>¥{routeSegment.cost ?? 0}</Text>
          <Button mode="outlined" onPress={onEdit} style={styles.editButton}>
            経路を編集
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'column',
    gap: 4,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  transportText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginVertical: 2,
  },
  cost: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  editButton: {
    marginTop: 4,
  },
});
