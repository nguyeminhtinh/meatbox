import {
  faTachometerAlt,
  faUserCircle,
  faStoreAlt,
  faTabletAlt,
  faChartPie,
  faCookieBite,
  faAd,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import ROUTERS from 'constants/routers';

const LIST_MENU = [
  {
    id: 1,
    label: '메인화면',
    to: '/',
    icon: faTachometerAlt,
    active: false,
    sub: false
  },
  {
    id: 2,
    label: '매장관리',
    to: ROUTERS.STORES,
    icon: faStoreAlt,
    active: false,
    sub: false
  },
  {
    id: 3,
    label: '기기관리',
    to: ROUTERS.DEVICE,
    icon: faTabletAlt,
    active: false,
    sub: false
  },

  {
    id: 4,
    label: '상품등록관리',
    to: '#',
    icon: faCookieBite,
    active: false,
    sub: true,
    name: 'product',
    listSub: [
      {
        id: 1,
        subLabel: '상품관리',
        subTo: ROUTERS.PRODUCT_MANAGEMENT,
        subIcon: '',
        subActive: false
      },
      {
        id: 2,
        subLabel: '상품이미지 등록 관리',
        subTo: ROUTERS.IMAGES_MANAGEMENT,
        subIcon: '',
        subActive: false
      }
      // {
      //   id: 3,
      //   subLabel: '랜딩페이지 등록 관리',
      //   subTo: ROUTERS.LANDING_MANAGEMENT,
      //   subIcon: '',
      //   subActive: false
      // }
    ]
  },
  {
    id: 5,
    label: '구매고객관리',
    to: ROUTERS.MEMBER,
    icon: faUserCircle,
    active: false,
    sub: false
  },
  {
    id: 6,
    label: '광고관리',
    to: ROUTERS.ADVERTING_REGISTER,
    icon: faAd,
    active: false,
    sub: false,
    name: 'adverting'
  },
  {
    id: 7,
    label: '매출관리',
    to: '#',
    icon: faChartPie,
    active: false,
    sub: true,
    name: 'revenue',
    listSub: [
      {
        id: 1,
        subLabel: '시간별 매출현황',
        subTo: ROUTERS.REVENUE_TIME,
        subIcon: '',
        subActive: false
      },
      {
        id: 2,
        subLabel: '일자별 매출현황',
        subTo: ROUTERS.REVENUEDAY_DAY,
        subIcon: '',
        subActive: false
      },
      {
        id: 3,
        subLabel: '상품별 매출',
        subTo: ROUTERS.REVENUE_PRODUCT,
        subIcon: '',
        subActive: false
      },
      {
        id: 4,
        subLabel: '매장별 매출',
        subTo: ROUTERS.REVENUE_STORE,
        subIcon: '',
        subActive: false
      },
      {
        id: 5,
        subLabel: '결제내역',
        subTo: ROUTERS.PAYMENT,
        subIcon: '',
        subActive: false
      }
    ]
  },
  {
    id: 8,
    label: '적립금관리',
    to: ROUTERS.RESERVE,
    icon: faEdit,
    active: false,
    sub: false
  }
];
export default LIST_MENU;
