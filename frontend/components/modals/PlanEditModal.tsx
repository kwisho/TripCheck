import { PlanItem } from '@trip-check/types';
import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { TimePicker } from 'react-native-paper-dates';
import PlaceAutocompleteInput from '../PlaceAutocompleteInput';

type Props = {
  planItem: PlanItem;
  isPlanEditModalOpen: boolean;
  onSave: (updated: PlanItem) => void;
  onDismiss: () => void;
};

export default function PlanItemEditModal({
  planItem,
  isPlanEditModalOpen,
  onDismiss,
  onSave,
}: Props) {
  const [locationStartDate, setLocationStartDate] = useState<Date>(new Date());
  const [locationEndDate, setLocationEndDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const handlePlaceSelected = useCallback(() => {
    console.log('handlePlaceSelected');
  }, []);

  return (
    <Modal
      visible={isPlanEditModalOpen}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>行き先を編集</Text>

          <PlaceAutocompleteInput label="行き先" onPlaceSelected={handlePlaceSelected} />

          {/* 活動開始日時（日付単位） */}

          <TimePicker
            inputType={'keyboard'}
            focused={'hours'}
            hours={0}
            minutes={0}
            onFocusInput={() => {}}
            onChange={({ hours, minutes }) => {
              const newDate = new Date(locationStartDate);
              newDate.setHours(hours);
              newDate.setMinutes(minutes);
              setLocationStartDate(newDate);
            }}
          />

          {/* 活動終了日時（日付単位） */}

          <TimePicker
            inputType={'keyboard'}
            focused={'hours'}
            hours={0}
            minutes={0}
            onFocusInput={() => {}}
            onChange={({ hours, minutes }) => {
              const newDate = new Date(locationEndDate);
              newDate.setHours(hours);
              newDate.setMinutes(minutes);
              setLocationEndDate(newDate);
            }}
          />

          {/* 活動内容の詳細説明（任意） */}
          <TextInput
            label="活動内容の詳細説明"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.buttonRow}>
            <Button onPress={onDismiss}>キャンセル</Button>
            <Button mode="contained" onPress={() => onSave}>
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
