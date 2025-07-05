import { useMapApi } from '@/api/features/map';
import { RouteSegment, TransportType } from '@trip-check/types';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { TimePicker } from 'react-native-paper-dates';

type Props = {
  segment: RouteSegment;
  isRouteEditModalOpen: boolean;
  onDismiss: () => void;
  onSave: (updated: RouteSegment) => void;
};

export default function RouteEditModal({
  segment,
  isRouteEditModalOpen,
  onDismiss,
  onSave,
}: Props) {
  const { fetchDistance } = useMapApi();
  const [transportType, setTransportType] = useState<TransportType>(segment.transportType);
  const [departureTime, setDepartureTime] = useState<Date>(segment.departureTime ?? new Date());
  const [arrivalTime, setArrivalTime] = useState<Date>(segment.arrivalTime ?? new Date());
  const [cost, setCost] = useState<string>(String(segment.cost));
  const [duration, setDuration] = useState<string>(String(segment.durationMinutes));

  console.log('', segment);
  console.log(segment.fromLocation);
  console.log(segment.toLocation);

  // arrivalTime を departure + duration で自動計算したい場合の例
  useEffect(() => {
    const depMs = departureTime.getTime();
    const durMs = parseInt(duration, 10) * 60 * 1000;
    setArrivalTime(new Date(depMs + durMs));
  }, [departureTime, duration]);

  /** 経路を保存 */
  const handleSave = () => {
    onSave({
      ...segment,
      transportType,
      departureTime,
      arrivalTime,
      cost: parseInt(cost, 10),
      durationMinutes: parseInt(duration, 10),
    });
    onDismiss();
  };

  /** 自動で経路情報を取得 */
  const handleAutoCalculate = async () => {
    if (!segment.fromLocation || !segment.toLocation || !transportType || !departureTime) {
      Alert.alert('経路情報が不足しています');
      return;
    }

    try {
      const result = await fetchDistance({
        fromLocation: segment.fromLocation,
        toLocation: segment.toLocation,
        departureTime: departureTime,
        transportType: transportType,
      });

      console.log('取得結果:', result);
    } catch (error) {
      console.error('経路取得に失敗しました:', error);
    }
  };

  /** 移動手順ラジオ */
  const renderRadioItem = () => {
    const radioItems: { value: TransportType; label: string }[] = [
      { value: 'DRIVING', label: '車' },
      { value: 'WALKING', label: '徒歩' },
      { value: 'BICYCLING', label: '自転車' },
      { value: 'TRANSIT', label: '公共交通' },
    ];

    return radioItems.map((item) => (
      <TouchableOpacity
        key={item.value}
        style={styles.radioItem}
        onPress={() => setTransportType(item.value)}
      >
        <RadioButton
          value={item.value}
          status={transportType === item.value ? 'checked' : 'unchecked'}
          onPress={() => setTransportType(item.value)}
        />
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    <Modal
      visible={isRouteEditModalOpen}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>経路を編集</Text>
          <Text style={styles.label}>
            {segment.fromLocation?.name} 〜 {segment.toLocation?.name}
          </Text>
          <Text style={styles.label}>移動手段</Text>
          <View style={styles.radioGroup}>{renderRadioItem()}</View>
          <Text style={styles.label}>出発時刻</Text>
          <TimePicker
            inputType={'keyboard'}
            focused={'hours'}
            hours={0}
            minutes={0}
            onFocusInput={() => {}}
            onChange={({ hours, minutes }) => {
              const newDate = new Date(departureTime);
              newDate.setHours(hours);
              newDate.setMinutes(minutes);
              setDepartureTime(newDate);
            }}
          />
          <Button mode="outlined" onPress={handleAutoCalculate} style={{ margin: 12 }}>
            自動で計算
          </Button>
          <Text style={styles.label}>所要時間（分）</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
          />
          <Text style={styles.label}>料金（円）</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={cost}
            onChangeText={setCost}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Button onPress={onDismiss}>キャンセル</Button>
            <Button mode="contained" onPress={handleSave}>
              保存
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
    border: 1,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  radioLabel: {
    fontSize: 14,
  },
  input: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
});
