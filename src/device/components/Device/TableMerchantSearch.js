// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import TableData from 'components/Table';
import { Loading } from 'components/Loading';
import SelectCustom from 'components/Select/SelectCustom';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import { headStorePopup } from 'constants/headerTable';
import filterStoreItems from '../../../mockData/filterStoreItems';

type Props = {
  getStoresByName: Function,
  storeName: string,
  getMerchantSelected: Function,
  storeList: Array<{}>,
  isProcessing: boolean
};
const TableMerchantSearch = ({
  getStoresByName,
  storeName,
  storeList,
  isProcessing,
  getMerchantSelected
}: Props) => {
  const [selectedStore, setSelectedStore] = useState({
    value: 'storeName',
    label: '가맹점명'
  });
  const [rowActive, setrowActive] = useState({});
  const inputValueRef = useRef('');
  const [params, setParams] = useState({
    storeName
  });

  useEffect(() => {
    getStoresByName(params);
  }, [params.storeName, params.storeAddress, params.storePhone]);
  console.log('isProcessing', isProcessing);

  const handleSelectChange = option => {
    setSelectedStore(option);
  };

  const renderInput = () => {
    if (selectedStore.value === 'storeName') {
      return (
        <Input
          placeholder="매장명을 입력해주세요."
          type="text"
          innerRef={inputValueRef}
        />
      );
    }
    if (selectedStore.value === 'storeAddress') {
      return (
        <Input
          placeholder="매장주소를 입력해주세요."
          type="text"
          innerRef={inputValueRef}
        />
      );
    }
    if (selectedStore.value === 'storePhone') {
      return (
        <Input
          placeholder="매장 전화번호를 입력해주세요."
          type="text"
          innerRef={inputValueRef}
        />
      );
    }
    return null;
  };

  const onClickRow = rowData => {
    getMerchantSelected(rowData);
    setrowActive(rowData);
  };

  const handleSubmitSearch = () => {
    const inputValue =
      inputValueRef.current && inputValueRef.current.value
        ? inputValueRef.current.value
        : '';
    setParams({
      [selectedStore.value]: inputValue
    });
  };

  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <Row className="row__custom register-device__popup">
        <Col xs={12} sm={4}>
          <SelectCustom
            listItem={filterStoreItems}
            option={selectedStore}
            onChange={option => handleSelectChange(option)}
            placeholder="매장명"
          />
        </Col>
        <Col xs={12} sm={5}>
          {renderInput()}
        </Col>
        <Col sm={3}>
          <PrimaryButton
            type="button"
            variant="secondary"
            onClick={handleSubmitSearch}
          >
            검색
          </PrimaryButton>
        </Col>
      </Row>
      <Row className="mt-4 table-store-list">
        {isProcessing ? (
          <div className="wrap-loading">
            <Loading
              animation="grow"
              role="status"
              className=""
              text=""
              variant="dark"
              size="lg"
              true
            />
          </div>
        ) : (
          <Col>
            <TableData
              tableHeads={headStorePopup}
              tableBody={storeList}
              onClickRow={onClickRow}
              rowActive={rowActive}
              isShowId
            />
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default memo<Props>(TableMerchantSearch);
