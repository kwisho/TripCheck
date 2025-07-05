import { FullPlan } from '@trip-check/types'

export const dummyFullPlan = (id: string): FullPlan => {
  const fullPlans: FullPlan[] = [
    {
      id: '1',
      name: '東京観光プラン',
      startDate: new Date('2025-10-10'),
      endDate: new Date('2025-10-12'),
      description: '浅草・渋谷をめぐる2泊3日の旅',
      userId: 'user1',
      advisability: true,
      imageUrl:
        'https://media.gettyimages.com/id/1204407968/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E6%B5%85%E8%8D%89%E3%81%AE%E6%B5%85%E8%8D%89%E5%AF%BA.jpg?s=612x612&w=0&k=20&c=s47mpVHkF-8YEyh0QqEOTZNOYOtfvwWlZc0KOstbRj8=',
      tags: [{ id: 'tag1', name: '観光' }],
      planItems: [
        {
          id: 'item1-1',
          planId: 'id1',
          locationId: 'loc1',
          locationStartDate: new Date('2025-10-10T09:00:00'),
          locationEndDate: new Date('2025-10-10T11:00:00'),
          description: '浅草寺を散策',
          location: {
            id: 'loc1',
            name: '浅草寺',
            latitude: 35.7148,
            longitude: 139.7967,
          },
          routeSegments: [
            {
              id: 'route1',
              planItemId: 'item1-1',
              fromLocationId: 'loc1',
              toLocationId: 'loc2',
              transportType: 'TRANSIT',
              durationMinutes: 20,
              cost: 300,
              departureTime: new Date('2025-10-10T11:10:00'),
              arrivalTime: new Date('2025-10-10T11:30:00'),
              fromLocation: {
                id: 'loc1',
                name: '浅草寺',
                latitude: 35.7148,
                longitude: 139.7967,
              },
              toLocation: {
                id: 'loc2',
                name: '渋谷駅',
                latitude: 35.658,
                longitude: 139.7016,
              },
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: '京都歴史巡り',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-03'),
      description: '紅葉の時期に京都を訪れるプラン',
      userId: 'user2',
      advisability: false,
      imageUrl: 'https://www.agoda.com/wp-content/uploads/2020/02/Places-to-visit-in-Kyoto-Kiyomizu-Temple.jpg',
      tags: [
        { id: 'tag2', name: '歴史' },
        { id: 'tag3', name: '紅葉' },
      ],
      planItems: [
        {
          id: 'item2-1',
          planId: 'id2',
          locationId: 'loc3',
          locationStartDate: new Date('2025-11-01T10:00:00'),
          locationEndDate: new Date('2025-11-01T12:00:00'),
          description: '清水寺と周辺を観光',
          location: {
            id: 'loc3',
            name: '清水寺',
            latitude: 34.9949,
            longitude: 135.7851,
          },
          routeSegments: [],
        },
      ],
    },
    {
      id: '3',
      name: '北海道グルメ旅',
      startDate: new Date('2025-12-20'),
      endDate: new Date('2025-12-25'),
      description: '札幌・小樽・函館で食を楽しむ',
      userId: 'user3',
      advisability: true,
      imageUrl: 'https://www.free-materials.com/adm/wp-content/uploads/2022/05/adpDSC_4912-.jpg',
      tags: [{ id: 'tag4', name: 'グルメ' }],
      planItems: [
        {
          id: 'item3-1',
          planId: 'id3',
          locationId: 'loc5',
          locationStartDate: new Date('2025-12-21T12:00:00'),
          locationEndDate: new Date('2025-12-21T14:00:00'),
          description: '札幌場外市場で海鮮丼',
          location: {
            id: 'loc5',
            name: '札幌場外市場',
            latitude: 43.0731,
            longitude: 141.3404,
          },
          routeSegments: [],
        },
        {
          id: 'item3-2',
          planId: 'id3',
          locationId: 'loc6',
          locationStartDate: new Date('2025-12-22T09:00:00'),
          locationEndDate: new Date('2025-12-22T11:00:00'),
          description: '小樽運河周辺を散策',
          location: {
            id: 'loc6',
            name: '小樽運河',
            latitude: 43.1975,
            longitude: 140.9947,
          },
          routeSegments: [
            {
              id: 'route3',
              planItemId: 'item3-1',
              fromLocationId: 'loc5',
              toLocationId: 'loc6',
              transportType: 'TRANSIT',
              durationMinutes: 60,
              cost: 1500,
              departureTime: new Date('2025-12-22T07:45:00'),
              arrivalTime: new Date('2025-12-22T08:45:00'),
              fromLocation: {
                id: 'loc5',
                name: '札幌場外市場',
                latitude: 43.0731,
                longitude: 141.3404,
              },
              toLocation: {
                id: 'loc6',
                name: '小樽運河',
                latitude: 43.1975,
                longitude: 140.9947,
              },
            },
          ],
        },
      ],
    },
  ]

  return fullPlans.find((plan) => plan.id === id)!
}
