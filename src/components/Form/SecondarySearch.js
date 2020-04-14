// @flow
// libs
import React, { memo, useState } from 'react';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';

type Props = {
  listStore?: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listDrive?: Array<{
    id: number,
    label: string,
    value: string
  }>,
  listKey: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};
export const SecondarySearch = ({
  listStore,
  listDrive,
  listKey,
  handleSubmitSearch = () => {}
}: Props) => {
  const initSearch = {
    storeName: ''
  };
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const [deviceCode, setDeviceCode] = useState(null);
  const [valueDefault, setValueDefault] = useState('');
  const handleChangeInput = value => {
    setValueDefault(value);
  };
  const [keySearch, setKeySearch] = useState({
    value: 0,
    label: '선택'
  });

  const handleSelectChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'deviceId':
        setDeviceCode(option);
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
      default:
        break;
    }
    return searchKey;
  };

  const submitSearch = () => {
    const key = formatSearchKey();
    const dataSearch = {
      deviceId: (deviceCode && deviceCode.value) || null,
      [key]: valueDefault
    };
    handleSubmitSearch(dataSearch);
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__store wd-50">
          <p className="form-search__title">매장명</p>
          <SelectDropdown
            listItem={listStore}
            value={objectSearch.store}
            onChange={e => handleSelectChange(e, 'store')}
            name="store"
            noOptionsMessage={() => '옵션 없음'}
            disabled
          />
        </div>
        <div className="form-search__address wd-payment">
          <p className="form-search__title">기기식별코드</p>
          <SelectCustom
            placeholder="전체"
            listItem={listDrive}
            option={deviceCode}
            onChange={e => handleSelectChange(e, 'deviceId')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail input-width">
          <p className="form-search__title">검색 </p>
          <SelectCustom
            listItem={listKey}
            option={keySearch}
            onChange={e => handleSelectChange(e, 'listKey')}
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
        <Button type="submit" variant="secondary" onClick={submitSearch}>
          검색
        </Button>
      </div>
    </div>
  );
};
SecondarySearch.defaultProps = {
  listStore: [],
  listDrive: []
};
export default memo<Props>(SecondarySearch);
