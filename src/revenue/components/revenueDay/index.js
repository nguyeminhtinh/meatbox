// @flow
// libs
import React, { useState, memo, useEffect } from 'react';
import Immutable from 'seamless-immutable';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import Loading from 'components/Loading';
import SixthSearch from '../../../components/Form/SixthSearch';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import Table from '../../../components/Table/index';
import { headRevenueDay } from '../../../constants/headerTable';
import ChartDay from '../../../components/Charts/ChartDay';

type Props = {
  getListRevenueDay: Function,
  getListYear: Function,
  listRevenueDay: Array<{}>,
  listYear: Array<{}>,
  dataRevenueHistories: Array<{}>,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

export const RevenueDayMain = ({
  getListRevenueDay = () => {},
  dataRevenueHistories,
  listRevenueDay,
  getListYear,
  listYear,
  isProcessing,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [radioActive, setRadioActive] = useState('day');
  const [params, setParams] = useState({
    month: parseInt(moment().format('MM'), 10),
    type: 'day',
    year: parseInt(moment().format('YYYY'), 10)
  });
  const param = {
    type: 'year',
    year: parseInt(moment().format('YYYY'), 10)
  };

  useEffect(() => {
    getListRevenueDay(params);
    getListYear(param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const handleOnchangeRadio = value => {
    setRadioActive(value);
  };
  const handleSubmitSearch = value => {
    setParams(value);
    getListRevenueDay(value);
  };

  return (
    <MainLayout>
      <Container fluid className="table-price-3 table-price-4 home-main">
        {radioActive === 'day' && (
          <TitleHeader title="일자별 매출현황 – 일별매출" />
        )}
        {radioActive === 'month' && (
          <TitleHeader title="일자별 매출현황 – 월별매출" />
        )}
        {radioActive === 'year' && (
          <TitleHeader title="일자별 매출현황 – 연별매출" />
        )}
        <SixthSearch
          handleOnchangeRadio={handleOnchangeRadio}
          radioActive={radioActive}
          handleSubmitSearch={handleSubmitSearch}
          listYear={listYear ? Immutable.asMutable(listYear) : []}
        />
        {isProcessing ? (
          <div className="wrapper-loading">
            <Loading
              animation="grow"
              role="status"
              className=""
              text=""
              variant="dark"
              size="lg"
            />
          </div>
        ) : (
          <>
            <div className="wrap-chart overflow-x">
              <ChartDay
                data={listRevenueDay}
                chartHeight={300}
                chartMinHeight={300}
                chartMinWidth={1190}
                radiusWidth={[45, 45, 0, 0]}
                barSizeWidth={15}
              />
            </div>
            <div className="mt-3">
              <Table
                tableHeads={headRevenueDay}
                tableBody={dataRevenueHistories}
                isShowId
              />
            </div>
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(RevenueDayMain);
