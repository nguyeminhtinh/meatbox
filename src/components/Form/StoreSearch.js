// @flow
// libs
import React, { memo, useState, useEffect } from 'react';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';

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
  getCityOptions = () => {},
  handleSubmitSearch = () => {}
}: Props) => {
  const initSearch = {
    pageRecord: 10,
    pageIndex: 1,
    province: '',
    city: '',
    ceoName: '',
    phone: '',
    companyName: ''
  };
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [selectedKey, setSelectedKey] = useState({
    value: 0,
    label: '전체'
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

  // get all provice options
  const [valueDefault, setValueDefault] = useState();
  const handleChangeInput = value => {
    setValueDefault(value);
  };

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
        setObjectSearch({
          ...objectSearch,
          city: value,
          labelCity: label
        });
        break;
      case 'searchType':
        setSelectedKey(option);
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
    switch (selectedKey.value) {
      case 1:
        searchKey = 'all';
        break;
      case 2:
        searchKey = 'ceoName';
        break;
      case 3:
        searchKey = 'phone';
        break;
      case 4:
        searchKey = 'companyName';
        break;
      default:
        break;
    }
    return searchKey;
  };

  const submitSearch = () => {
    const key = formatSearchKey();
    const dataSearch = {
      pageRecord: objectSearch.pageRecord,
      pageIndex: objectSearch.pageIndex,
      province: objectSearch.province,
      city: objectSearch.province === '' ? '' : objectSearch.city,
      [key]: valueDefault && valueDefault.replace(/-/g, '')
    };
    handleSubmitSearch(dataSearch);
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={objectSearch.pageRecord}
            onChange={e => handleSelectChange(e, 'pageRecord')}
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
        <div className="form-search__detail input-width">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKey}
            option={selectedKey}
            onChange={e => handleSelectChange(e, 'searchType')}
            noOptionsMessage={() => '옵션 없음'}
          />
          {selectedKey.label === '매장전화번호' && (
            <Input
              placeholder="검색어를 입력해주세요."
              type="text"
              onChange={e => handleChangeInput(e)}
              value={valueDefault}
            />
          )}
          {selectedKey.label !== '매장전화번호' && (
            <Input
              placeholder="검색어를 입력해주세요."
              type="text"
              onChange={e => handleChangeInput(e)}
              value={valueDefault}
            />
          )}
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
  handleSubmitSearch: () => {},
  getCityOptions: () => {}
};
export default memo<Props>(PrimarySearch);
