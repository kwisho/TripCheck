import { usePlanApi } from '@/api/features/plan';
import { PlanCard } from '@/components/cards/PlanCard';
import PlanItemCard from '@/components/cards/PlanItemCard';
import PlanRouteCard from '@/components/cards/PlanRouteCard';
import PlanItemEditModal from '@/components/modals/PlanEditModal';
import RouteEditModal from '@/components/modals/RouteEditModal';
import DateTabBar from '@/components/tab/DateTabBar';
import { FullPlan, PlanItem, RouteSegment } from '@trip-check/types';
import { formatDate } from '@trip-check/utils';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type DateTab = {
  date: Date;
};

export default function PlanDetailScreen() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const [plan, setPlan] = useState<FullPlan | null>(null);
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [selectedDataPlanItems, setSelectedDatePlanItems] = useState<FullPlan['planItems']>([]);
  const [dates, setDates] = useState<DateTab[]>([]);

  // 経路編集モーダルの開閉状態
  const [isRouteEditModalOpen, setIsRouteEditModalOpen] = useState(false);
  const [isPlanItemEditModalOpen, setIsPlanItemEditModalOpen] = useState(false);

  // 編集対象のルート情報（nullの場合はモーダルを開かない）
  const [editingRouteSegment, setEditingRouteSegment] = useState<RouteSegment | null>(null);
  const [editingPlanItem, setEditingPlanItem] = useState<PlanItem | null>(null);

  const { getPlan } = usePlanApi();

  // 初回読み込み：planId が存在すればプラン詳細を取得
  useEffect(() => {
    if (planId) {
      getPlan(planId)
        .then((fetchedPlan) => {
          console.log('取得成功', fetchedPlan);
          setPlan(fetchedPlan);
          setSelectDate(fetchedPlan.startDate);
          setSelectedDatePlanItems(
            fetchedPlan?.planItems.filter(
              (item) =>
                formatDate(item.locationStartDate) >= formatDate(fetchedPlan.startDate) &&
                formatDate(item.locationEndDate) <= formatDate(fetchedPlan.startDate)
            ) ?? []
          );
          createDateList(fetchedPlan.startDate, fetchedPlan.endDate);
        })
        .catch((error) => {
          console.error('取得失敗', error);
        });
    } else {
      setPlan(null);
    }
  }, [planId]);

  /** 日程の開始から終了までの配列を作成する */
  const createDateList = useCallback(
    (startDate: Date, endDate: Date): void => {
      if (!startDate || !endDate) return;
      const current = new Date(startDate);
      const planDates: DateTab[] = [];
      while (current <= endDate) {
        planDates.push({ date: new Date(current) });
        current.setDate(current.getDate() + 1);
      }
      setDates(planDates);
    },
    [plan?.startDate, plan?.endDate]
  );

  /** 選択した日付のデータにリストを絞り込む */
  const handleSelectDate = useCallback(
    (date: Date) => {
      setSelectDate(date);
      setSelectedDatePlanItems(
        plan?.planItems.filter(
          (item) =>
            formatDate(item.locationStartDate) >= formatDate(date) &&
            formatDate(item.locationEndDate) <= formatDate(date)
        ) ?? []
      );
      console.log('plan:', plan);
      console.log('handleSelectDate:', date);
      console.log('selectedDataPlanItems:', selectedDataPlanItems);
    },
    [plan]
  );

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

  /** PlanItemを含めたPlanを保存する */
  const handlePlanSave = useCallback(() => {
    console.log('handlePlanSave');
  }, []);

  return (
    <View style={[styles.container]}>
      {/* 旅程詳細編集モーダル（対象があれば表示） */}
      {editingPlanItem && (
        <PlanItemEditModal
          planItem={editingPlanItem}
          onDismiss={() => {
            setIsPlanItemEditModalOpen(false);
            setEditingPlanItem(null);
          }}
          onSave={handlePlanSave}
          isPlanEditModalOpen={isPlanItemEditModalOpen}
        />
      )}
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
          }}
        />
      )}

      {/* プラン概要カード */}
      <PlanCard plan={plan ?? null} />

      {/* 日程リストタブ */}
      <DateTabBar dates={dates} onSelectDate={handleSelectDate} selectedDate={selectDate} />

      {/* 各日程の旅程 & 経路一覧 */}
      {selectedDataPlanItems.map((planItem) => (
        <View key={planItem.id}>
          {/* 旅程カード */}
          <PlanItemCard
            planItem={planItem}
            location={planItem.location}
            onEdit={() => {
              setEditingPlanItem(planItem);
              setIsPlanItemEditModalOpen(true);
            }}
          />

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
