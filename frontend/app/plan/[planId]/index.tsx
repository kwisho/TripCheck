import { usePlanApi } from '@/api/features/plan';
import { PlanCard } from '@/components/cards/PlanCard';
import PlanItemCard from '@/components/cards/PlanItemCard';
import PlanRouteCard from '@/components/cards/PlanRouteCard';
import RouteEditModal from '@/components/modals/RouteEditModal';
import { FullPlan, RouteSegment } from '@trip-check/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function PlanDetailScreen() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const [plan, setPlan] = useState<FullPlan | null>(null);

  // 経路編集モーダルの開閉状態
  const [isRouteEditModalOpen, setIsRouteEditModalOpen] = useState(false);

  // 編集対象のルート情報（nullの場合はモーダルを開かない）
  const [editingRouteSegment, setEditingRouteSegment] = useState<RouteSegment | null>(null);

  const { getPlan } = usePlanApi();

  // 初回読み込み：planId が存在すればプラン詳細を取得
  useEffect(() => {
    if (planId) {
      getPlan(planId)
        .then((fetchedPlan) => {
          console.log('取得成功', fetchedPlan);
          setPlan(fetchedPlan);
        })
        .catch((error) => {
          console.error('取得失敗', error);
        });
    } else {
      setPlan(null);
    }
  }, []);

  /**
   * 指定した routeSegment を plan の中で更新する
   */
  const updateRouteSegment = (updatedSegment: RouteSegment) => {
    if (!plan) return;

    const updatedPlanItems = plan.planItems.map((item) => {
      if (item.id !== updatedSegment.planItemId) return item;

      return {
        ...item,
        routeSegments: item.routeSegments.map((segment) =>
          segment.id === updatedSegment.id ? updatedSegment : segment
        ),
      };
    });

    setPlan({
      ...plan,
      planItems: updatedPlanItems,
    });
  };

  return (
    <View style={[styles.container]}>
      {/* 経路編集モーダル（対象があれば表示） */}
      {editingRouteSegment && (
        <RouteEditModal
          isRouteEditModalOpen={isRouteEditModalOpen}
          segment={editingRouteSegment}
          onDismiss={() => {
            setIsRouteEditModalOpen(false);
            setEditingRouteSegment(null);
          }}
          onSave={(updatedSegment) => {
            updateRouteSegment(updatedSegment); // ローカルステート更新
            setIsRouteEditModalOpen(false);
            setEditingRouteSegment(null);
            // TODO: API反映が必要ならここで呼び出す
          }}
        />
      )}

      {/* プラン概要カード */}
      <PlanCard plan={plan ?? null} />

      {/* 各日程の旅程 & 経路一覧 */}
      {plan?.planItems.map((planItem) => (
        <View key={planItem.id}>
          {/* 旅程カード */}
          <PlanItemCard planItem={planItem} location={planItem.location} />

          {/* 経路カード一覧 */}
          {planItem.routeSegments?.map((routeSegment) => (
            <View key={routeSegment.id}>
              <PlanRouteCard
                routeSegment={routeSegment}
                onEdit={() => {
                  setEditingRouteSegment(routeSegment); // 編集対象をセット
                  setIsRouteEditModalOpen(true); // モーダルを開く
                }}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafa',
  },
});
