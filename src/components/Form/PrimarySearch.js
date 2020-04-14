// @flow
// libs
import React, { memo, useState, useEffect } from 'react';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Radio from 'components/Radio';
import Input from 'components/Input/InputChange';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listAddress: Object,
  cityOptions: Object,
  listKey: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function,
  getCityOptions: Function
};

export const PrimarySearch = ({
  listPage,
  listAddress,
  cityOptions,
  listKey,
  handleSubmitSearch = () => {},
  getCityOptions = () => {}
}: Props) => {
  const initSearch = {
    pageSize: 10,
    province: '',
    city: '',
    deviceType: '',
    frozen: '',
    deviceStatus: '',
    address: '',
    deviceCode: '',
    pageIndex: 0
  };

  const [objectSearch, setObjectSearch] = useState(initSearch);

  const [pageSizeOption, setPageSizeOption] = useState({
    value: 10,
    label: 10
  });
  useEffect(() => {
    if (objectSearch && objectSearch.province === '') {
      setObjectSearch({
        ...objectSearch,
        labelCity: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAddress]);
  const [valueDefault, setValueDefault] = useState();
  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const [keySearch, setKeySearch] = useState('');

  const handleSelectChange = (option, name) => {
    const { value, label } = option;
    switch (name) {
      case 'province':
        setObjectSearch({
          ...objectSearch,
          province: value,
          labelProvince: label
        });
        getCityOptions(value);
        if (objectSearch.labelCity) {
          setObjectSearch({
            ...objectSearch,
            city: '',
            labelCity: '',
            province: value,
            labelProvince: label
          });
        }
        break;
      case 'city':
        // setIisSelectedCity(true);
        setObjectSearch({
          ...objectSearch,
          city: value,
          labelCity: label
        });
        break;
      case 'pageSize':
        setPageSizeOption(option);
        break;
      case 'listKey':
        setKeySearch(option);
        setValueDefault('');
        break;
      default:
        setObjectSearch({
          ...objectSearch,
          [name]: value
        });
    }
  };

  const formatSearchKey = () => {
    let searchKey = 'all';
    switch (keySearch.value) {
      case 0:
        searchKey = 'all';
        break;
      case 1:
        searchKey = 'deviceCode';
        break;
      case 2:
        searchKey = 'storeName';
        break;
      case 3:
        searchKey = 'address';
        break;
      default:
        break;
    }
    return searchKey;
  };

  const submitSearch = () => {
    const key = formatSearchKey();
    const dataSearch = {
      pageSize: pageSizeOption.value,
      province: objectSearch.province,
      city: objectSearch.province === '' ? '' : objectSearch.city,
      deviceType: objectSearch.deviceType,
      frozenType: objectSearch.frozen,
      deviceStatus: objectSearch.deviceStatus,
      pageIndex: 0,
      [key]: valueDefault
    };
    handleSubmitSearch(dataSearch);
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectCustom
            listItem={listPage}
            option={pageSizeOption}
            onChange={e => handleSelectChange(e, 'pageSize')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>

        <div className="form-search__address">
          <p className="form-search__title">주소</p>
          <SelectDropdown
            placeholder="시/도"
            listItem={listAddress}
            value={objectSearch && objectSearch.labelProvince}
            onChange={e => handleSelectChange(e, 'province')}
            noOptionsMessage={() => '옵션 없음'}
          />
          <SelectDropdown
            placeholder="시/군/구"
            listItem={cityOptions}
            value={objectSearch && objectSearch.labelCity}
            onChange={e => handleSelectChange(e, 'city')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="group-radio">
          <div className="form-search__classification">
            <p className="form-search__title">기기모델명</p>
            <Radio
              id="all"
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: ''
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === ''}
              labelRadio="전체"
              name="all"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'single'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'single'}
              id="single"
              labelRadio="싱글"
              name="single"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'slim'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'slim'}
              id="slim"
              labelRadio="슬림"
              name="slim"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  deviceType: 'double'
                });
              }}
              isChecked={objectSearch && objectSearch.deviceType === 'double'}
              id="double"
              labelRadio="더블"
              name="double"
            />
          </div>
          <div className="form-search__classification">
            <p className="form-search__title">냉동/냉장</p>
            <Radio
              id="frozenAll"
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  frozen: ''
                });
              }}
              isChecked={objectSearch && objectSearch.frozen === ''}
              labelRadio="전체"
              name="frozenAll"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  frozen: 'frozen'
                });
              }}
              isChecked={objectSearch && objectSearch.frozen === 'frozen'}
              id="frozen"
              labelRadio="냉동"
              name="frozen"
            />
            <Radio
              onChange={() => {
                setObjectSearch({
                  ...objectSearch,
                  frozen: 'cold'
                });
              }}
              isChecked={objectSearch && objectSearch.frozen === 'cold'}
              id="cold"
              labelRadio="냉장"
              name="cold"
            />
          </div>
        </div>
        <div className="form-search__classification">
          <p className="form-search__title">기기상태</p>
          <Radio
            id="instrumentAll"
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: ''
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === ''}
            labelRadio="전체"
            name="instrumentAll"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: 'use'
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === 'use'}
            id="use"
            labelRadio="사용중"
            name="inuse"
          />
          <Radio
            onChange={() => {
              setObjectSearch({
                ...objectSearch,
                deviceStatus: 'stop'
              });
            }}
            isChecked={objectSearch && objectSearch.deviceStatus === 'stop'}
            id="stop"
            labelRadio="사용해지"
            name="used"
          />
        </div>
        <div className="form-search__detail input-width">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKey}
            option={keySearch}
            onChange={e => handleSelectChange(e, 'listKey')}
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
      </div>
      <div className="form-search__right">
        <Button type="submit" variant="secondary" onClick={submitSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};

PrimarySearch.defaultProp = {
  handleSubmitSearch: () => {}
};
export default memo<Props>(PrimarySearch);
