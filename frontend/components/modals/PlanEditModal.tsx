import { AutocompletePrediction, Location, PlanItem } from '@trip-check/types';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { TimePicker } from 'react-native-paper-dates';
import PlaceAutocompleteInput from '../PlaceAutocompleteInput';
import { formatJapaneseDate } from '@trip-check/utils';

type Props = {
  planItem: PlanItem & { location: Location };
  isPlanEditModalOpen: boolean;
  selectDate: Date;
  onSave: (updated: PlanItem) => void;
  onDismiss: () => void;
};

export default function PlanItemEditModal({
  planItem,
  isPlanEditModalOpen,
  selectDate,
  onDismiss,
  onSave,
}: Props) {
  const [locationStartDate, setLocationStartDate] = useState<Date>(new Date());
  const [locationEndDate, setLocationEndDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction>();
  console.log('selectedPlace ', selectedPlace);
  useEffect(() => {
    setLocationStartDate(planItem.locationStartDate);
    setLocationEndDate(planItem.locationEndDate);
    setDescription(planItem.description || '');
    setSelectedPlace({
      description: planItem.location.name,
      place_id: planItem.locationId,
    });
  }, [planItem]);

  const handlePlaceSelected = useCallback((placeName: AutocompletePrediction) => {
    setSelectedPlace(placeName);
  }, []);

  const handleSave = () => {
    onSave({
      ...planItem,
      locationStartDate: locationStartDate,
      locationEndDate: locationEndDate,
      description,
      locationId: selectedPlace?.place_id as string,
    });
  };

  return (
    <Modal
      visible={isPlanEditModalOpen}
      animationType="slide"
      onRequestClose={onDismiss}
      transparent
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>行き先を編集 {formatJapaneseDate(selectDate)}</Text>

            <PlaceAutocompleteInput label="行き先" onPlaceSelected={handlePlaceSelected} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              {/* 開始時間 */}
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>開始時間</Text>
                <TimePicker
                  inputType="keyboard"
                  focused="hours"
                  hours={locationStartDate.getHours()}
                  minutes={locationStartDate.getMinutes()}
                  onFocusInput={() => {}}
                  onChange={({ hours, minutes }) => {
                    const newDate = new Date(locationStartDate);
                    newDate.setHours(hours);
                    newDate.setMinutes(minutes);
                    setLocationStartDate(newDate);
                  }}
                />
              </View>

              <Text style={{ fontSize: 18, marginHorizontal: 8 }}>〜</Text>

              {/* 終了時間 */}
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>終了時間</Text>
                <TimePicker
                  inputType="keyboard"
                  focused="hours"
                  hours={locationEndDate.getHours()}
                  minutes={locationEndDate.getMinutes()}
                  onFocusInput={() => {}}
                  onChange={({ hours, minutes }) => {
                    const newDate = new Date(locationEndDate);
                    newDate.setHours(hours);
                    newDate.setMinutes(minutes);
                    setLocationEndDate(newDate);
                  }}
                />
              </View>
            </View>

            <Text style={styles.label}>活動内容の詳細説明（任意）</Text>
            <TextInput
              label="活動内容の詳細説明"
              multiline
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.buttonRow}>
              <Button onPress={onDismiss}>キャンセル</Button>
              <Button mode="contained" onPress={handleSave}>
                保存
              </Button>
            </View>
          </ScrollView>
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
    maxHeight: '90%',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    marginBlock: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 12,
  },
});
