// @flow

import React, { memo, useEffect } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import ROUTERS from '../../constants/routers';
import IMAGES from '../../constants/images';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import MainLayout from '../../layout/MainLayout';
import BoxCount from '../../components/BoxCount';
import TitleHeader from '../../components/TitleHeader';

type Props = {
  getRevenues: Function,
  isProcessing: boolean,
  topRevenuesTime: Array<{
    value: number
  }>,
  topProducts: Array<{}>,
  topRevenuesDay: Array<{
    value: number
  }>,
  countShop: number,
  countDevice: number,
  countUser: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

const Home = ({
  getRevenues,
  isProcessing,
  topRevenuesTime,
  topProducts,
  topRevenuesDay,
  countShop,
  countDevice,
  countUser,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  useEffect(() => {
    getRevenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const currentSales =
    (topRevenuesTime &&
      topRevenuesTime.reduce((sum, sale) => {
        return sum + sale.value;
      }, 0)) ||
    0;
  const totalRevenue =
    (topRevenuesDay &&
      topRevenuesDay.reduce((sum, total) => {
        return sum + total.value;
      }, 0)) ||
    0;

  return (
    <Container className="reset-padding" fluid>
      <MainLayout>
        <div className="home-main p-3">
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
              <TitleHeader title="메인화면" />
              <Row>
                <Col md={6}>
                  <div className="line-chart line-overflow-x">
                    <LineChart
                      data={
                        topRevenuesTime
                          ? Immutable.asMutable(topRevenuesTime)
                          : []
                      }
                      titleChart="현재 매출"
                      unit={`${currentSales &&
                        currentSales.toLocaleString('en')}원`}
                      onDetail={ROUTERS.REVENUE_TIME}
                      chartHeight={250}
                      chartMinHeight={250}
                      chartMinWidth={320}
                      chartColor="#8884d8"
                    />
                  </div>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <div className="line-chart line-overflow-x">
                    <LineChart
                      data={
                        topRevenuesDay
                          ? Immutable.asMutable(topRevenuesDay)
                          : []
                      }
                      titleChart="총 매출(일별)"
                      unit={`${totalRevenue &&
                        totalRevenue.toLocaleString('en')}원`}
                      onDetail={ROUTERS.REVENUEDAY_DAY}
                      chartHeight={250}
                      chartMinHeight={250}
                      chartMinWidth={320}
                      chartColor="#82ca9d"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <div className="bar-chart overflow-x">
                    <BarChart
                      data={topProducts ? Immutable.asMutable(topProducts) : []}
                      titleBarChart="총 상품 매출 순위 Top10"
                      onDetail={ROUTERS.REVENUE_PRODUCT}
                      chartHeight={350}
                      chartMinHeight={350}
                      chartMinWidth={1024}
                    />
                  </div>
                </Col>
              </Row>

              <div className="wrap-box mt-3">
                <Row>
                  <Col sm={4} className="mt-3">
                    <BoxCount
                      image={IMAGES.imgHome}
                      customClass="box-home"
                      number={countShop}
                      titleLink="매장 상세보기"
                      OnDetail={ROUTERS.STORES}
                      iconDetail
                      titleHeader="오픈한 총 매장수"
                    />
                  </Col>
                  <Col sm={4} className="mt-3">
                    <BoxCount
                      image={IMAGES.imgDevice}
                      customClass="box-device"
                      number={countDevice}
                      titleLink="기기 상세보기"
                      OnDetail={ROUTERS.DEVICE}
                      iconDetail
                      titleHeader="설치된 총 기기수"
                    />
                  </Col>
                  <Col sm={4} className="mt-3">
                    <BoxCount
                      image={IMAGES.imgUser}
                      customClass="box-user"
                      number={countUser}
                      titleLink="회원 상세보기"
                      OnDetail={ROUTERS.MEMBER}
                      iconDetail
                      titleHeader="등록한 총 회원수"
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </Container>
  );
};

export default memo<Props>(Home);
