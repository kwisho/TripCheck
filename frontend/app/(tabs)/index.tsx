import * as React from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Plan } from '@trip-check/types';
import { useEffect, useState } from 'react';
import { usePlanApi } from '@/api/features/plan';
import { formatJapaneseDate, fromISOToDate } from '@trip-check/utils';

export default function DashboardScreen() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    console.log('🐣');
    const { getPlans } = usePlanApi();

    getPlans()
      .then((fetchedPlans) => {
        console.log('取得成功', fetchedPlans);
        setPlans(fetchedPlans.items);
      })
      .catch((error) => {
        console.error('取得失敗', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground
        source={require('@/assets/images/global-trip.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.title}>TripCheck</Text>

        {plans.length !== 0 && (
          <View style={styles.tripSection}>
            <Text style={styles.sectionTitle}>最近の旅程</Text>
            <View style={styles.cardsRow}>
              {plans.map((plan) => (
                <View key={plan.id} style={styles.tripCard}>
                  <Text style={styles.tripIcon}>{plan.icon}</Text>
                  <Text style={styles.tripTitle}>{plan.name}</Text>
                  <Text style={styles.tripDate}>{formatJapaneseDate(plan.startDate)}</Text>
                  <Text style={styles.tripDate}>{formatJapaneseDate(plan.endDate)}</Text>
                  <Button
                    mode="outlined"
                    style={styles.detailButton}
                    labelStyle={styles.detailButtonText}
                  >
                    詳細を見る
                  </Button>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.newTripButtonWrapper}>
          <View style={styles.newTripButtonCircle}>
            <Text style={styles.newTripPlus}>＋</Text>
            <Text style={styles.newTripText}>新しい旅程</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // スクロール可能な画面全体
  container: {
    flex: 1,
  },
  // 背景画像全体
  background: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  // コンテンツ配置と余白調整
  content: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  // アプリタイトルスタイル
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 60,
    color: '#003b4f', // 濃い青
  },
  // あいさつメッセージ
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    color: '#003b4f',
  },
  // 最近の旅程セクション全体のコンテナ
  tripSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    width: '90%',
  },
  // セクションタイトル
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003b4f',
    marginBottom: 12,
  },
  // カードの横並び
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  // 各カードのスタイル
  tripCard: {
    backgroundColor: '#E6FAFA',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '30%',
    marginBottom: 12,
  },
  // アイコンの絵文字
  tripIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  // 旅程タイトル
  tripTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  // 日付テキスト
  tripDate: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  // 詳細ボタン
  detailButton: {
    borderColor: '#003b4f',
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
  },
  // 詳細ボタンのテキストスタイル
  detailButtonText: {
    fontSize: 12,
    color: '#003b4f',
  },
  // 新しい旅程ボタンの配置
  newTripButtonWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  // 丸いボタンの背景
  newTripButtonCircle: {
    backgroundColor: '#00c1a0',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 「＋」のスタイル
  newTripPlus: {
    fontSize: 32,
    color: 'white',
  },
  // 「新しい旅程」テキスト
  newTripText: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
});
