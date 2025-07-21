import React from 'react';
import { TouchableOpacity, View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { formatDate } from '@trip-check/utils';

type DateTab = {
  date: Date;
};

type Props = {
  dates: DateTab[];
  onSelectDate: (update: Date) => void;
  selectedDate: Date;
};

export default function DateTabBar({ dates, onSelectDate, selectedDate }: Props) {
  // console.log('dates', dates);
  // console.log('selectedDate', selectedDate);

  const renderItem = ({ item }: { item: DateTab }) => {
    const isSelected = selectedDate === item.date;

    return (
      <TouchableOpacity
        onPress={() => onSelectDate(item.date)}
        style={[styles.tabItem, isSelected && styles.tabItemSelected]}
      >
        <Text style={[styles.tabDate, isSelected && styles.tabDateSelected]}>
          {formatDate(item.date)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={dates}
      renderItem={renderItem}
      keyExtractor={(item) => item.date.toLocaleDateString()}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  tabItemSelected: {
    backgroundColor: '#6200ee',
  },
  tabDate: {
    fontSize: 14,
    color: '#333',
  },
  tabDateSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
