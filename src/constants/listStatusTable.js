export const listValueStatusAd = [
  { className: 'green', textLabe: '대기', status: 1 },
  { className: 'reject', textLabe: '반려', status: 2 },
  { className: 'governor', textLabe: '승인', status: 3 }
];
export const listValueStatusPayment = [
  { className: '', textLabe: '결제완료', status: 1 },
  { className: 'color-red', textLabe: '결제취소', status: 2 }
];
export const listValueStatusDevice = [
  { className: '', textLabe: '사용중', status: 1 },
  { className: 'color-red', textLabe: '사용해지', status: 2 },
  { className: 'color-blue', textLabe: '사용대기', status: 3 }
];
export default {
  listValueStatusAd,
  listValueStatusPayment,
  listValueStatusDevice
};
