import { usePlanApi } from '@/api/features/plan';
import { PlanCard } from '@/components/cards/PlanCard';
import { Plan } from '@trip-check/types';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, IconButton, Searchbar } from 'react-native-paper';

// AntDesign check-circle
// AntDesign warning

export default function DashboardScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();
  const { getPlans } = usePlanApi();
  const [originalPlans, setOriginalPlans] = useState<Plan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getPlans()
      .then((fetchedPlans) => {
        setPlans(fetchedPlans.items);
        setOriginalPlans(fetchedPlans.items);
      })
      .catch((error) => {
        console.error('取得失敗', error);
      });
  }, [getPlans]);

  /** 検索 */
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setSearchQuery(searchQuery);
      console.log('searchQuery:', searchQuery);
      if (searchQuery === '') {
        setPlans(originalPlans);
        return;
      } else {
        console.log('plans:', plans);
        setPlans(
          originalPlans.filter((originalPlan) =>
            originalPlan.name.toLowerCase().includes(searchQuery)
          )
        );
      }
    },
    [plans, searchQuery]
  );

  const handleCardPress = (planId: string) => {
    // 例: /plan/123 のような詳細ページへ遷移
    /** @todo */
    router.push(`/plan/${planId}`);
  };

  return (
    <View style={[styles.container]}>
      {/* SearchComponent */}
      <Searchbar
        placeholder="検索する"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {/* TagComponent */}
      {/* タグ（チップ） */}
      <View style={styles.chipContainer}>
        <Chip icon="calendar" onPress={() => {}}>
          今月の予定
        </Chip>
        <Chip icon="map" onPress={() => {}} style={{ marginLeft: 8 }}>
          近場の旅
        </Chip>
      </View>
      {/* 旅程一覧 */}

      <ScrollView contentContainerStyle={styles.content}>
        {plans.map((plan) => (
          <TouchableOpacity key={plan.id} onPress={() => handleCardPress(plan.id)}>
            <PlanCard plan={plan} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 新規追加ボタン（右下） */}
      <IconButton
        icon="plus-circle"
        size={48}
        style={styles.addButton}
        onPress={() => router.push('/plan/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafa',
  },
  searchBar: {
    margin: 16,
    borderRadius: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: 'white',
  },
});
