// @flow
/* eslint-disable react/no-find-dom-node */
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Radio from 'components/Radio';
import ko from 'date-fns/locale/ko';
// import Input from 'components/Input/InputChange';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

registerLocale('ko', ko);

type Props = {
  listStore: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listDrive: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};
export const PaymentSearch = ({
  listStore,
  listDrive,

  handleSubmitSearch = () => {}
}: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deviceCode, setDeviceCode] = useState({
    label: '전체',
    value: ''
  });
  const [storeName, setStoreName] = useState({
    label: '전체',
    value: ''
  });
  const initSearch = {
    storeId: '',
    deviceId: '',
    payType: '',
    status: '',
    pageIndex: 0,
    pageSize: 10,
    period: 0,
    startDay: '',
    endDate: ''
  };
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [period, setPeriod] = useState(0);
  const startDateRef = useRef('');
  const endDateRef = useRef('');

  const buttonActive = id => {
    setPeriod(id);

    switch (id) {
      case 0:
        setStartDate(new Date(moment(new Date())));
        setEndDate(new Date(moment(new Date())));
        break;
      case 7:
        setStartDate(new Date(moment(new Date()).subtract(6, 'days')));
        setEndDate(new Date(moment(new Date())));
        break;
      case 30:
        setStartDate(new Date(moment(new Date()).subtract(29, 'days')));
        setEndDate(new Date(moment(new Date())));
        break;
      case 90:
        setStartDate(new Date(moment(new Date()).subtract(89, 'days')));
        setEndDate(new Date(moment(new Date())));
        break;
      case 5:
        setObjectSearch({
          ...objectSearch,
          startDay: moment(startDate).format('YYYY-MM-DD'),
          endDay: moment(endDate).format('YYYY-MM-DD')
        });
        break;
      default:
        setObjectSearch({
          ...objectSearch,
          startDay: '',
          endDay: ''
        });
        break;
    }
  };

  const submitSearch = () => {
    if (endDate < startDate) {
      return;
    }
    handleSubmitSearch({
      ...objectSearch,
      payType: objectSearch.payType,
      status: objectSearch.status,
      startDay:
        startDate === null ? '' : moment(startDate).format('YYYY-MM-DD'),
      endDay: endDate === null ? '' : moment(endDate).format('YYYY-MM-DD'),
      period: period === 5 ? null : period,
      deviceId: deviceCode && deviceCode.value,
      storeId: storeName && storeName.value
    });
  };

  useEffect(() => {
    const nodeStart =
      startDateRef && startDateRef.current && startDateRef.current.input
        ? startDateRef.current.input
        : null;
    const nodeEnd =
      endDateRef && endDateRef.current && endDateRef.current.input
        ? endDateRef.current.input
        : null;
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', 'true');
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', 'true');
  }, []);

  return (
    <div className="form-search payment-search">
      <div className="form-search__left col-md-6">
        <div className="form-search__store">
          <p className="form-search__title">조회기간</p>
          <div className="list-button">
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive(0)}
              className={period === 0 ? 'active' : ''}
            >
              오늘
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive(7)}
              className={period === 7 ? 'active' : ''}
            >
              일주일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive(30)}
              className={period === 30 ? 'active' : ''}
            >
              30일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive(90)}
              className={period === 90 ? 'active' : ''}
            >
              90일
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => buttonActive(5)}
              className={period === 5 ? 'active' : ''}
            >
              기간설정
            </Button>
          </div>
        </div>
        <div className="form-search__date payment-date">
          <p className="form-search__title">조회일자</p>
          <div className="range-date">
            <div className="start-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                startDate={startDate}
                endDate={endDate}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={startDateRef}
                disabled={period !== 5}
                isClearable
                placeholderText="날짜를 선택해주세요."
              />
            </div>
            <p className="icon">~</p>
            <div className="end-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                endDate={endDate}
                minDate={startDate}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={endDateRef}
                disabled={period !== 5}
                isClearable
                placeholderText="날짜를 선택해주세요."
              />
            </div>
          </div>
        </div>

        <div className="form-search__store wd-payment">
          <p className="form-search__title">매장명</p>
          <SelectCustom
            placeholder="전체"
            listItem={listStore}
            option={storeName}
            onChange={option => {
              setStoreName(option);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__address wd-payment">
          <p className="form-search__title">기기식별코드</p>
          <SelectCustom
            placeholder="전체"
            listItem={listDrive}
            option={deviceCode}
            onChange={option => {
              setDeviceCode(option);
            }}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
      </div>
      <div className="form-search__right col-md-6">
        <div className="form-search__classification">
          <p className="form-search__title text-left">결제구분</p>
          <Radio
            id="all"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                payType: ''
              });
            }}
            isChecked={objectSearch && objectSearch.payType === ''}
            labelRadio="전체"
            name="all"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                payType: 'creditcard'
              });
            }}
            isChecked={objectSearch && objectSearch.payType === 'creditcard'}
            id="creditcard"
            labelRadio="카드결제"
            name="creditcard"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                payType: 'kakaopay'
              });
            }}
            isChecked={objectSearch && objectSearch.payType === 'kakaopay'}
            id="kakaopay"
            labelRadio="QR결제"
            name="kakaopay"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                payType: 'point'
              });
            }}
            isChecked={objectSearch && objectSearch.payType === 'point'}
            id="point"
            labelRadio="쿠폰결제"
            name="point"
          />
        </div>
        <div className="form-search__classification">
          <p className="form-search__title text-left">결제상태</p>
          <Radio
            id="StatusAll"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                status: ''
              });
            }}
            isChecked={objectSearch && objectSearch.status === ''}
            labelRadio="전체"
            name="StatusAll"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                status: 'paid'
              });
            }}
            isChecked={objectSearch && objectSearch.status === 'paid'}
            labelRadio="결제완료"
            name="paid"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                status: 'cancel'
              });
            }}
            isChecked={objectSearch && objectSearch.status === 'cancel'}
            labelRadio="결제취소"
            name="cancel"
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="secondary" onClick={submitSearch}>
            검색
          </Button>
        </div>
      </div>
    </div>
  );
};
export default memo<Props>(PaymentSearch);
