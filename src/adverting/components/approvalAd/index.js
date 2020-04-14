// @flow
// libs
import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from 'components/Loading';
import Table from 'components/Table';
import SevenSearch from '../../../components/Form/SevenSearch';
import MainLayout from '../../../layout/MainLayout';
import TitleHeader from '../../../components/TitleHeader';
import { listStatusAd } from '../../../constants/listKey';
import listPage from '../../../constants/listPageSize';
import DataAdverting from '../../../mockData/DataAdverting';
import { headAdverting } from '../../../constants/headerTable';
import { listValueStatusAd } from '../../../constants/listStatusTable';

type Props = {
  history: {
    push: Function
  },
  isProcessing: boolean
};

export const ApprovalAd = ({ history, isProcessing }: Props) => {
  const handleSubmitSearch = value => {
    console.log(value, 'keySearch');
  };
  const handleClickAdDetail = item => {
    history.push(`adverting/${item.id}`);
  };
  const totalCount = 100;
  return (
    <>
      {isProcessing && (
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
      )}
      <MainLayout>
        <Container fluid className="home-main">
          <TitleHeader title="광고승인관리" />
          <Row>
            <Col sm={12}>
              <SevenSearch
                handleSubmitSearch={handleSubmitSearch}
                listKey={listStatusAd}
                listPage={listPage}
              />
            </Col>
            <Col sm={12} className="d-flex justify-content-end">
              <div className="table-status col-sm-5 col-md-6 px-0 table-responsive my-4">
                <table className="table table-striped table-bordered text-center mb-0">
                  <thead>
                    <tr>
                      <th scope="col">전체</th>
                      <th scope="col">승인</th>
                      <th scope="col">대기</th>
                      <th scope="col">반려</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>123</td>
                      <td>120</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col sm={12} className="tableAd">
              <Table
                tableHeads={headAdverting}
                tableBody={DataAdverting}
                statusField="status"
                valueStatusField={listValueStatusAd}
                isShowColumnBtnStatus
                onClickRow={handleClickAdDetail}
              />
            </Col>
          </Row>
        </Container>
        <Col sm={12} className="wrapper-pagination">
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel={<span className="gap">...</span>}
            pageCount={Math.ceil(totalCount / 10)}
            // onPageChange={eventKey => handleActivePage(eventKey)}
            forcePage={0}
            containerClassName="pagination"
            disabledClassName="disabled"
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            marginPagesDisplayed={1}
          />
        </Col>
      </MainLayout>
    </>
  );
};

export default memo<Props>(ApprovalAd);
