export const listKey = [
  { id: 1, value: 1, label: '전체' },
  { id: 2, value: 2, label: '대표자' },
  { id: 3, value: 3, label: '매장전화번호' },
  { id: 4, value: 4, label: '매장명' }
];

export const listKeyRevenue = [
  { id: 1, value: 1, label: '선택' },
  { id: 2, value: 2, label: '대표자' },
  { id: 3, value: 3, label: '매장전화번호' },
  { id: 4, value: 4, label: '매장명' }
];

export const listKeyTime = [
  { id: 1, value: 0, label: '선택' },
  { id: 2, value: 1, label: '기기식별코드' },
  { id: 3, value: 2, label: '매장명' }
];

export const listKeyStore = [
  { id: 1, value: 0, label: '전체' },
  { id: 2, value: 1, label: '매장명' },
  { id: 3, value: 2, label: '대표자' },
  { id: 4, value: 3, label: '매장 전화번호' },
  { id: 5, value: 4, label: '매장 주소' },
  { id: 6, value: 5, label: '기기식별코드' }
];
export const listKeyProduct = [
  { id: 0, value: 0, label: '선택' },
  { id: 1, value: 1, label: '상품명' },
  { id: 2, value: 2, label: '상품코드' }
  // { id: 3, value: 2, label: '브랜드' }
];
export const categoryProduct = [
  { id: 0, value: '', label: '전체' },
  { id: 1, value: 1031, label: '고기류' },
  { id: 2, value: 1022, label: '고공품' }
];

export const categoryRegisterProduct = [
  { id: 1, value: 1031, label: '고기류' },
  { id: 2, value: 1022, label: '고공품' }
];
export const listNameProduct = [
  { id: 1, value: 0, label: '상품명/브랜드' },
  { id: 2, value: 1, label: '상품명/브랜드' }
];

export const searchTypeProductPage = [
  { id: 0, value: '전체', label: '전체' },
  { id: 1, value: '상품코드', label: '상품코드' },
  { id: 2, value: '상품 카테고리', label: '상품 카테고리' },
  { id: 3, value: '상품명', label: '상품명' },
  { id: 4, value: '브랜드', label: '브랜드' },
  { id: 5, value: '상품위치', label: '상품위치' },
  { id: 4, value: '수량', label: '수량' }
];
export const listKeySearchPrimary = [
  { id: 1, value: '전체', label: '전체' },
  { id: 2, value: '기기모델명', label: '기기모델명' },
  { id: 3, value: '기기식별코드', label: '기기식별코드' },
  { id: 4, value: '매장명', label: '매장명' }
];

export const listKeySearchFourth = [
  { id: 1, value: 'codeProduct', label: '상품명' }
];

export const listKeySearchFive = [
  { id: 1, value: 'storeName', label: '매장명' }
];

export const listKeyInventory = [
  { id: 1, value: 0, label: '전체' },
  { id: 2, value: 1, label: '매장명' },
  { id: 3, value: 2, label: '기기모델명' },
  { id: 4, value: 3, label: '냉동/냉장' },
  { id: 5, value: 4, label: '기기식별코드' }
];

export const listKeyDeviceSearch = [
  { id: 1, value: 0, label: '전체' },
  { id: 1, value: 1, label: '기기식별코드' },
  { id: 2, value: 2, label: '매장명' },
  { id: 3, value: 3, label: '매장주소' }
];

export const listDriveModelName = [
  { id: 1, value: '선택', label: '선택' },
  { id: 2, value: '슬림', label: '슬림' },
  { id: 3, value: '싱글', label: '싱글' },
  { id: 4, value: '더블', label: '더블' }
];

export const listStatus = [
  { id: 1, value: '선택', label: '선택' },
  { id: 2, value: '냉동', label: '냉동' },
  { id: 3, value: '냉장', label: '냉장' },
  { id: 3, value: '가공품', label: '가공품' }
];
export const listRanking = [
  { id: 1, value: '1++', label: '1++' },
  { id: 2, value: '1+', label: '1+' },
  { id: 3, value: '1등급', label: '1등급' },
  { id: 4, value: '2등급', label: '2등급' },
  { id: 5, value: '3등급', label: '3등급' },
  { id: 6, value: '등급없음', label: '등급없음' }
];

export const listStatusAd = [
  { id: 1, value: '전체', label: '전체' },
  { id: 2, value: '제목', label: '제목' },
  { id: 3, value: '매장명', label: '매장명' },
  { id: 4, value: '작성자', label: '작성자' },
  { id: 5, value: '등록일시', label: '등록일시' },
  { id: 6, value: '상태', label: '상태' }
];
export const listStatusPaymentType = [
  { id: 1, value: '결제금액', label: '결제금액' },
  { id: 2, value: '결제상태', label: '결제상태' }
];
export const listStatusPayment = [
  { id: 1, value: '결제완료', label: '결제완료' },
  { id: 2, value: '결제취소', label: '결제취소' }
];

export default {
  listKey,
  listKeyRevenue,
  listKeyTime,
  listKeyStore,
  listKeySearchFive,
  listKeySearchPrimary,
  listKeySearchFourth,
  listKeyInventory,
  listDriveModelName,
  listStatus,
  searchTypeProductPage,
  listStatusAd,
  listStatusPaymentType,
  listStatusPayment
};
