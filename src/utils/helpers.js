/* eslint-disable no-param-reassign */
import moment from 'moment';
// import { formatValue } from './Validators';
// import { categoryProduct } from 'constants/listKey';

export const getAllCity = arr => {
  const results = [];
  // eslint-disable-next-line no-unused-expressions
  arr &&
    arr.forEach(element => {
      // eslint-disable-next-line no-unused-expressions
      element.cities &&
        element.cities.forEach(item => {
          results.push(item);
        });
    });

  return results;
};

export const getAllDistricts = arr => {
  const results = [];
  // eslint-disable-next-line no-unused-expressions
  arr &&
    arr.forEach(provides => {
      // eslint-disable-next-line no-unused-expressions
      provides.cities &&
        provides.cities.forEach(cities => {
          // eslint-disable-next-line no-unused-expressions
          cities.towns &&
            cities.towns.forEach(district => {
              results.push(district);
            });
        });
    });

  return results;
};

// export const getListDistirctByProvice = arr => {
//   const results = [];
//   arr.forEach(element => {
//     element.listDistrict.forEach(item => {
//       results.push(item);
//     });
//   });
//   return results;
// };

export const getListDistirctByCity = arr => {
  const results = [];
  arr.forEach(element => {
    element.listDistrict.forEach(item => {
      results.push(item);
    });
  });
  return results;
};

export const getOptionYears = range => {
  const year = parseInt(moment().format('YYYY'), 10);
  const listYear = [];
  for (let i = year - range; i <= year; i += 1) {
    listYear.push({
      id: i,
      value: i,
      label: `${i}년`
    });
  }
  return listYear;
};

export const getListProvince = arr => arr.map(item => item);

export const handleOrderList = (arr, firstIdx, secondIdx) => {
  const temp = arr[firstIdx];
  arr[firstIdx] = arr[secondIdx];
  arr[secondIdx] = temp;

  return arr;
};

export const formatTypeDevice = key => {
  let type;
  switch (key) {
    case 'single':
      type = '싱글';
      break;
    case 'double':
      type = '더블';
      break;
    case 'slim':
      type = '슬림';
      break;
    default:
      break;
  }
  return type;
};

export const formatPreservationType = key => {
  let type;
  switch (key) {
    case 'frozen':
      type = '냉동';
      break;
    case 'cold':
      type = '냉장';
      break;
    default:
      break;
  }

  return type;
};

export const formatValueStatus = key => {
  let value;
  switch (key) {
    case 'use':
      value = 1;
      break;
    case 'stop':
      value = 2;
      break;
    case 'standby':
      value = 3;
      break;
    default:
      break;
  }

  return value;
};

export const formatValuesStatus = key => {
  let value;
  switch (key) {
    case 'use':
      value = '사용중';
      break;
    case 'stop':
      value = '사용해지';
      break;
    case 'standby':
      value = '사용대기';
      break;
    default:
      break;
  }

  return value;
};

export const formatValuesStatusPayment = key => {
  let value;
  switch (key) {
    case 'paid':
      value = 1;
      break;
    case 'cancel':
      value = 2;
      break;
    default:
      break;
  }

  return value;
};

export const formatValuesPayment = key => {
  let value;
  switch (key) {
    case 'paid':
      value = '결제완료';
      break;
    case 'cancel':
      value = '결제취소';
      break;
    default:
      break;
  }

  return value;
};

export const formatValuesPayType = key => {
  let value;
  switch (key) {
    case 'creditcard':
      value = '카드결제';
      break;
    case 'kakaopay':
      value = 'QR결제';
      break;
    case 'point':
      value = '쿠폰결제';
      break;
    default:
      break;
  }

  return value;
};

export const formatValueTemperature = value => {
  return value ? value.replace('ºC', '') : 0;
};

export const getCategoryNameById = (categoriesOptions, categoryId) => {
  return (
    categoriesOptions &&
    categoriesOptions.find(item => item.value === categoryId)
  );
};

export const formatNegativeDay = negativeDay => {
  let dayFormat;
  const previousCurrentMonth = moment().format('M') - 1;
  const currentYear = moment().year();
  const monthOfYear = `${currentYear} - ${previousCurrentMonth}}`;

  const numberDayOfMonth = moment(monthOfYear, 'YYYY-MM').daysInMonth();

  switch (negativeDay) {
    case 0:
      dayFormat = numberDayOfMonth;
      break;
    case -1:
      dayFormat = numberDayOfMonth - 1;
      break;
    case -2:
      dayFormat = numberDayOfMonth - 2;
      break;
    case -3:
      dayFormat = numberDayOfMonth - 3;
      break;
    case -4:
      dayFormat = numberDayOfMonth - 4;
      break;
    case -5:
      dayFormat = numberDayOfMonth - 5;
      break;
    default:
      break;
  }

  return dayFormat;
};
