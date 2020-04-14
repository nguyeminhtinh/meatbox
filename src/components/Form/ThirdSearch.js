// @flow
// libs
import React, { useState, memo, useRef } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import Input from 'components/Input';
// import { formatValue } from '../../utils/Validators';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch?: Function
};
export const ThirdSearch = ({
  listPage,
  handleSubmitSearch = () => {}
}: Props) => {
  const initSearch = {
    numberRows: 10,
    currentPage: 0
  };

  const [objectSearch, setObjectSearch] = useState(initSearch);
  const inputSearchRef = useRef('');

  const handleSelectChange = (event, name) => {
    const { value } = event;
    setObjectSearch({
      ...objectSearch,
      [name]: value
    });
  };

  const submitSearch = () => {
    const valueSearch = inputSearchRef.current
      ? inputSearchRef.current.value
      : '';
    handleSubmitSearch({
      ...objectSearch,
      ...{
        // userPhone: `${valueSearch.slice(0, 3)}-${valueSearch.slice(
        //   3,
        //   7
        // )}-${valueSearch.slice(7, 11)}`
        userPhone: valueSearch.replace(/-/g, '')
      }
    });
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기</p>
          <SelectDropdown
            listItem={listPage}
            value={objectSearch.numberRows}
            onChange={e => handleSelectChange(e, 'numberRows')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>
        <div className="form-search__detail input-width">
          <p className="form-search__title">휴대폰번호</p>
          <Input
            placeholder="-없이 숫자만 입력"
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

ThirdSearch.defaultProps = {
  handleSubmitSearch: () => {}
};

export default memo<Props>(ThirdSearch);
