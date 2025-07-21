import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMapApi } from '@/api/features/map';
import { AutocompleteParams, AutocompletePrediction } from '@trip-check/types';
import debounce from 'lodash.debounce';

type Props = {
  label: string;
  onPlaceSelected: (place: AutocompletePrediction) => void;
};

export default function PlaceAutocompleteInput({ label, onPlaceSelected }: Props) {
  const { fetchAutocomplete } = useMapApi();
  const [input, setInput] = useState('');
  const [predictions, setPredictions] = useState<AutocompletePrediction[]>([]);

  // オートコンプリートを取得する処理（API呼び出し）
  const fetchSuggestions = useCallback(
    async (value: string) => {
      if (!value) {
        setPredictions([]);
        return;
      }
      try {
        const params: AutocompleteParams = {
          input: value,
          language: 'ja',
        };
        const result = await fetchAutocomplete(params);
        setPredictions(result.predictions);
      } catch (error) {
        console.error('Autocomplete fetch failed:', error);
      }
    },
    [fetchAutocomplete]
  );

  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 500), [fetchSuggestions]);

  // テキストが変わった時に発火
  const handleChangeText = (text: string) => {
    setInput(text);
    debouncedFetch(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={input}
        placeholder="場所を入力"
        onChangeText={handleChangeText}
      />

      <FlatList
        data={predictions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setInput(item.description);
              setPredictions([]);
              onPlaceSelected(item);
            }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
