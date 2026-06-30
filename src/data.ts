import { SoccerMatch, DishItem, LeagueStanding } from './types';

export const INITIAL_MATCHES: SoccerMatch[] = [
  {
    id: 'm1',
    league: '2026美加墨世界杯 · 1/8淘汰赛',
    leagueColor: 'text-yellow-400',
    homeTeam: '中国',
    awayTeam: '西班牙',
    homeLogo: '🇨🇳',
    awayLogo: '🇪🇸',
    homeScore: 1,
    awayScore: 1,
    status: 'LIVE',
    minute: '82\'',
    events: [
      { minute: '31\'', type: 'goal', player: '莫拉塔', team: 'away' },
      { minute: '45\'', type: 'card_yellow', player: '武磊', team: 'home' },
      { minute: '76\'', type: 'goal', player: '张玉宁', team: 'home' },
    ]
  },
  {
    id: 'm2',
    league: '2026美加墨世界杯 · 1/8淘汰赛',
    leagueColor: 'text-cyan-400',
    homeTeam: '阿根廷',
    awayTeam: '葡萄牙',
    homeLogo: '🇦🇷',
    awayLogo: '🇵🇹',
    homeScore: 2,
    awayScore: 2,
    status: 'LIVE',
    minute: '64\'',
    events: [
      { minute: '15\'', type: 'goal', player: '梅西', team: 'home' },
      { minute: '28\'', type: 'goal', player: 'C罗', team: 'away' },
      { minute: '42\'', type: 'goal', player: '劳塔罗', team: 'home' },
      { minute: '58\'', type: 'goal', player: '菲利克斯', team: 'away' },
    ]
  },
  {
    id: 'm3',
    league: '2026美加墨世界杯 · 1/4决赛',
    leagueColor: 'text-blue-400',
    homeTeam: '巴西',
    awayTeam: '法国',
    homeLogo: '🇧🇷',
    awayLogo: '🇫🇷',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    matchTime: '今天 23:00'
  },
  {
    id: 'm4',
    league: '2026美加墨世界杯 · 小组赛C组',
    leagueColor: 'text-red-400',
    homeTeam: '美国',
    awayTeam: '英格兰',
    homeLogo: '🇺🇸',
    awayLogo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    matchTime: '明天 02:30'
  },
  {
    id: 'm5',
    league: '2026美加墨世界杯 · 小组赛F组',
    leagueColor: 'text-purple-400',
    homeTeam: '加拿大',
    awayTeam: '意大利',
    homeLogo: '🇨🇦',
    awayLogo: '🇮🇹',
    homeScore: 2,
    awayScore: 1,
    status: 'FINISHED',
    matchTime: '已完赛'
  }
];

export const LEAGUE_STANDINGS: LeagueStanding[] = [
  { rank: 1, team: '中国 🇨🇳', played: 3, gd: '+3', points: 7 },
  { rank: 2, team: '西班牙 🇪🇸', played: 3, gd: '+2', points: 5 },
  { rank: 3, team: '德国 🇩🇪', played: 3, gd: '0', points: 4 },
  { rank: 4, team: '日本 🇯🇵', played: 3, gd: '-2', points: 1 },
  { rank: 5, team: '哥斯达黎加 🇨🇷', played: 3, gd: '-3', points: 0 },
];

export const INITIAL_DISHES: DishItem[] = [
  {
    id: 'd1',
    name: '波士顿龙虾伴蒜香黄油',
    price: 198,
    originalPrice: 288,
    image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=90',
    description: '特选深海波士顿龙虾，鲜甜多汁，伴以法式香草大蒜黄油，浓郁醇香，回味无穷。',
    tags: ['招牌主推', '每日限量', '深海空运']
  },
  {
    id: 'd2',
    name: '炭烤M9+顶级和牛战斧',
    price: 588,
    originalPrice: 788,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
    description: '重达1.2kg的顶级澳洲M9+战斧和牛，精细火候炭火慢烤，外酥里嫩，肉香满溢。',
    tags: ['奢华品质', '炭香浓郁', '大口吃肉']
  },
  {
    id: 'd3',
    name: '德式巴伐利亚脆皮烤猪肘',
    price: 128,
    originalPrice: 168,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=90',
    description: '经典巴伐利亚风味，外皮酥脆卡吱作响，肉质饱满柔嫩，搭配酸菜与特制黄芥末酱。',
    tags: ['经典必点', '分量十足', '香脆爽口']
  },
  {
    id: 'd4',
    name: '极客荧光矩阵特调鸡尾酒',
    price: 58,
    originalPrice: 88,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=90',
    description: '专为电子屏幕与夜间赛事定制，含有蓝橙利口酒、天然柠檬汁，杯缘自带荧光，口感清新。',
    tags: ['观赛伴侣', '限定特饮', '低卡清新']
  },
  {
    id: 'd5',
    name: '黄金狂热深海海鲜塔大拼盘',
    price: 328,
    originalPrice: 428,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=90',
    description: '汇聚生蚝、帝王蟹脚、冰虾、扇贝等豪华深海美味，配秘制泰式酸辣汁与鸡尾酒酱。',
    tags: ['聚会狂欢', '超值海鲜', '生猛冷盘']
  }
];
