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
// import { getAllCity, getListProvince } from 'utils/helpers';

registerLocale('ko', ko);

type Props = {
  // listStore: Array<{
  //   id: number,
  //   label: string,
  //   value: string
  // }>,
  listKeySearchFive: Array<{
    id: number,
    label: string,
    value: string
  }>,
  // listAddress: Object,
  handleSubmitSearch: Function
};

export const FiveSearch = ({
  // listStore,
  listKeySearchFive,
  handleSubmitSearch
}: Props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // const [selectedStore, setSelectedStore] = useState('전체');
  const [valueDefault, setValueDefault] = useState('');
  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const [searchType, setSearchType] = useState({
    value: 'storeName',
    label: '전체'
  });
  // const [objectSearch, setObjectSearch] = useState(initSearch);
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  // const inputSearchRef = useRef(null);
  // // Address

  // // get all provice options
  // const listProvince = getListProvince(listAddress);
  // // get all city options
  // const allCity = getAllCity(listAddress);
  // // get all district options
  // // const allDistricts = getAllDistricts(listAddress);

  // const [listCity, setListCity] = useState(allCity);

  // // const [listDistrict, setListDistrict] = useState(allDistricts);
  // const [isSelectedProvice, setIsSelectedProvice] = useState(false);
  // const [isSelectedCity, setIisSelectedCity] = useState(false);

  // useEffect(() => {
  //   const proviceSelected = listProvince.find(
  //     item => item.name === objectSearch.province
  //   );
  //   // const citySelected = allCity.find(item => item.name === objectSearch.city);
  //   if (isSelectedProvice) {
  //     setListCity(proviceSelected && proviceSelected.cities);
  //   }
  //   // if (isSelectedCity) {
  //   //   setListDistrict(citySelected && citySelected.towns);
  //   // }
  // }, [
  //   objectSearch.province,
  //   objectSearch.city,
  //   isSelectedProvice,
  //   isSelectedCity,
  //   listAddress,
  //   allCity,
  //   listProvince
  // ]);

  // end Address

  // const handleSelectChange = (option, name) => {
  //   const { value } = option;

  //   switch (name) {
  //     case 'searchType':
  //       setSearchType(option);
  //       break;
  //     // case 'provinces':
  //     //   setIsSelectedProvice(true);
  //     //   setObjectSearch({
  //     //     ...objectSearch,
  //     //     province: value
  //     //   });
  //     //   break;
  //     // case 'city':
  //     //   setIisSelectedCity(true);
  //     //   setObjectSearch({
  //     //     ...objectSearch,
  //     //     city: value
  //     //   });
  //     //   break;
  //     default:
  //       setObjectSearch({
  //         ...objectSearch,
  //         [name]: value
  //       });
  //   }
  // };

  // const submitSearch = () => {
  //   const valueSearch = inputSearchRef.current
  //     ? inputSearchRef.current.value
  //     : '';
  //   handleSubmitSearch({
  //     ...objectSearch,
  //     ...{ [searchType.value]: valueSearch }
  //   });
  // };

  const submitSearch = () => {
    let objSearch = {
      [searchType && searchType.value]: valueDefault
    };

    if (startDate) {
      objSearch = {
        ...objSearch,
        startDay: moment(startDate).format('YYYY-MM-DD')
      };
    }

    if (endDate) {
      objSearch = {
        ...objSearch,
        endDay: moment(endDate).format('YYYY-MM-DD')
      };
    }

    handleSubmitSearch({ ...objSearch, pageIndex: 0 });
  };

  useEffect(() => {
    const nodeStart =
      startDateRef && startDateRef.current ? startDateRef.current.input : '';
    const nodeEnd =
      endDateRef && endDateRef.current ? endDateRef.current.input : '';
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', true);
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', true);
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
        {/* <div className="form-search__store wd-50">
          <p className="form-search__title">매장명</p>
          <SelectDropdown
            listItem={listStore}
            value={selectedStore}
            onChange={optionStore => {
              setSelectedStore(optionStore && optionStore.value);
            }}
            noOptionsMessage={() => '옵션 없음'}
            // disabled
          />
        </div> */}
        <div className="form-search__detail">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKeySearchFive}
            option={searchType}
            onChange={option => setSearchType(option)}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="전체"
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            onChange={e => handleChangeInput(e)}
            value={valueDefault}
          />
        </div>
        {/* <div className="form-search__address">
          <p className="form-search__title">주소</p>
          <SelectDropdown
            placeholder="시/도"
            listOptionString={listProvince}
            value={objectSearch.province}
            onChange={e => handleSelectChange(e, 'provinces')}
            noLabel
            noOptionsMessage={() => '옵션 없음'}
            disabled
          />
          <SelectDropdown
            placeholder="시/군/구"
            listOptionString={listCity}
            value={objectSearch.city}
            onChange={e => handleSelectChange(e, 'city')}
            noLabel
            noOptionsMessage={() => '옵션 없음'}
            disabled
          />
        </div> */}
      </div>
      <div className="form-search__right">
        <Button type="submit" variant="secondary" onClick={submitSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};

export default memo<Props>(FiveSearch);
