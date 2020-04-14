// @flow
/* eslint-disable react/no-find-dom-node */
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

registerLocale('ko', ko);
type Props = {
  listDrive: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKeySearchFourth: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const FourthSearch = ({
  listDrive,
  listKeySearchFourth,
  handleSubmitSearch
}: Props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [deviceCode, setDeviceCode] = useState(null);
  const [valueDefault, setValueDefault] = useState('');
  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const [keySearch, setKeySearch] = useState({
    value: 'codeProduct',
    label: '전체'
  });

  const startDateRef = useRef('');
  const endDateRef = useRef('');

  const handleSearch = () => {
    let objSearch = {
      [keySearch.value]: valueDefault
    };

    if (startDate) {
      objSearch = {
        ...objSearch,
        startDate: moment(startDate).format('YYYY-MM-DD')
      };
    }

    if (endDate) {
      objSearch = {
        ...objSearch,
        endDate: moment(endDate).format('YYYY-MM-DD')
      };
    }

    if (deviceCode) {
      objSearch = {
        ...objSearch,
        codeDevice: deviceCode && deviceCode.value
      };
    }

    handleSubmitSearch({ ...objSearch, page: 0 });
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
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__date">
          <p className="form-search__title">조회 일자</p>
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
                placeholderText="날짜를 선택해주세요."
                isClearable
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
                placeholderText="날짜를 선택해주세요."
                isClearable
              />
            </div>
          </div>
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
        <div className="form-search__detail">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKeySearchFourth}
            option={keySearch}
            onChange={option => setKeySearch(option)}
            noOptionsMessage={() => '옵션 없음'}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            onChange={e => handleChangeInput(e)}
            value={valueDefault}
          />
        </div>
      </div>
      <div className="form-search__right">
        <Button type="submit" variant="secondary" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};
export default memo<Props>(FourthSearch);
