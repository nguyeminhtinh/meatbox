// @flow
// libs
import React, { useState, memo, useRef } from 'react';
import Button from 'components/Button';
import Radio from 'components/Radio';
import SelectDropdown from 'components/Select';
import Input from 'components/Input';

type Props = {
  listPage: Array<{
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

export const AdSearch = ({
  listPage,
  listKey,
  handleSubmitSearch = () => {}
}: Props) => {
  const initSearch = {
    pageSize: 10,
    status: 'all'
  };
  const [searchType, setSearchType] = useState(listKey[0].label);
  const [status, setStatus] = useState('all');
  const [objectSearch, setObjectSearch] = useState(initSearch);
  const inputSearchRef = useRef(null);
  const handleSelectChange = (event, name) => {
    const { value, label } = event;
    switch (name) {
      case 'searchType':
        setSearchType(label);
        break;
      default:
        setObjectSearch({
          ...objectSearch,
          [name]: value
        });
    }
  };

  const submitSearch = () => {
    const valueSearch = inputSearchRef.current
      ? inputSearchRef.current.value
      : '';
    handleSubmitSearch({
      ...objectSearch,
      ...{ [searchType]: valueSearch },
      status
    });
  };
  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={objectSearch.pageSize}
            onChange={e => handleSelectChange(e, 'pageSize')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__classification">
          <p className="form-search__title">상태</p>
          <Radio
            onChange={() => {
              setStatus('all');
            }}
            id="all"
            isChecked={status === 'all'}
            labelRadio="전체"
            name="all"
          />
          <Radio
            onChange={() => {
              setStatus('approved');
            }}
            id="approved"
            isChecked={status === 'approved'}
            labelRadio="승인"
            name="approved"
          />
          <Radio
            onChange={() => {
              setStatus('waiting');
            }}
            id="waiting"
            isChecked={status === 'waiting'}
            labelRadio="대기"
            name="waiting"
          />
          <Radio
            onChange={() => {
              setStatus('companion');
            }}
            id="companion"
            isChecked={status === 'companion'}
            labelRadio="반려"
            name="companion"
          />
        </div>
        <div className="form-search__detail input-width">
          <p className="form-search__title">검색</p>
          <SelectDropdown
            listItem={listKey}
            value={searchType}
            onChange={e => handleSelectChange(e, 'searchType')}
            noOptionsMessage={() => '옵션 없음'}
          />
          <Input
            placeholder="검색어를 입력해주세요."
            type="text"
            innerRef={inputSearchRef}
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
export default memo<Props>(AdSearch);
