// @flow
// libs
import React, { memo, useState } from 'react';
import SelectDropdown from 'components/Select';
import SelectCustom from 'components/Select/SelectCustom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';

type Props = {
  listPage: Array<{
    id: number,
    label: string,
    value: string
  }>,
  // listAddress: Object,
  listKey: Array<{
    id: number,
    label: string,
    value: string
  }>,
  // listKeyProduct: Array<{
  //   id: number,
  //   label: string,
  //   value: string
  // }>,
  categoryProduct: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitSearch: Function
};

export const ProductSearch = ({
  listPage,
  // listAddress,
  listKey,
  // listKeyProduct,
  categoryProduct,
  handleSubmitSearch = () => {}
}: Props) => {
  const [searchType, setSearchType] = useState('');

  const [category, setcategory] = useState(null);
  const [numberRows, setNumberRows] = useState(10);

  // const [objectSearch, setObjectSearch] = useState(initSearch);
  const [valueDefault, setValueDefault] = useState();
  const handleChangeInput = value => {
    setValueDefault(value);
  };

  const handleSelectChange = (option, name) => {
    const { value } = option;
    switch (name) {
      case 'category':
        setcategory(option);
        break;
      case 'searchType':
        setSearchType(option);
        setValueDefault('');
        break;
      case 'numberRows':
        setNumberRows(value);
        break;
      default:
        break;
    }
  };

  const formatSearchKey = () => {
    let searchKey = 'all';
    switch (searchType.value) {
      case 0:
        searchKey = 'all';
        break;
      case 1:
        searchKey = 'productName';
        break;
      case 2:
        searchKey = 'productCode';
        break;
      // case 2:
      //   searchKey = 'branch';
      //   break;
      default:
        break;
    }
    return searchKey;
  };

  const submitSearch = () => {
    const key = formatSearchKey();
    const objSearch = {
      numberRows: numberRows || '',
      category: (category && category.value) || '',
      productCode: '',
      productName: ''
      // branch: '',
    };

    handleSubmitSearch({ ...objSearch, [key]: valueDefault });
  };

  return (
    <div className="form-search">
      <div className="form-search__left">
        <div className="form-search__pages">
          <p className="form-search__title">항목 보기 </p>
          <SelectDropdown
            listItem={listPage}
            value={numberRows}
            onChange={e => handleSelectChange(e, 'numberRows')}
            noOptionsMessage={() => '옵션 없음'}
          />
        </div>

        <div className="form-search__address">
          <p className="form-search__title">카테고리</p>
          <SelectCustom
            listItem={categoryProduct}
            option={category}
            onChange={e => handleSelectChange(e, 'category')}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="전체"
          />
        </div>
        <div className="form-search__detail input-width">
          <p className="form-search__title">검색</p>
          <SelectCustom
            listItem={listKey}
            option={searchType}
            onChange={e => handleSelectChange(e, 'searchType')}
            noOptionsMessage={() => '옵션 없음'}
            placeholder="선택"
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

ProductSearch.defaultProp = {
  handleSubmitSearch: () => {}
};
export default memo<Props>(ProductSearch);
