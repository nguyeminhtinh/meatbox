// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, memo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'components/Table';
import Loading from 'components/Loading';
import ThirdSearch from '../../components/Form/ThirdSearch';
import { headMember } from '../../constants/headerTable';
import TitleHeader from '../../components/TitleHeader';
import MainLayout from '../../layout/MainLayout';
import listPage from '../../constants/listPageSize';

type Props = {
  getListMembers?: Function,
  listMembers: Array<{}>,
  isProcessing: boolean,
  totalRows: number,
  history: {
    push: Function
  },
  totalCustomer: number,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const MemberManagement = ({
  getListMembers = () => {},
  listMembers,
  isProcessing,
  totalRows,
  history,
  totalCustomer,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const [params, setParams] = useState({
    numberRows: 10,
    userPhone: '',
    currentPage: 0
  });
  const handleSelectPagination = eventKey => {
    setParams({ ...params, currentPage: eventKey.selected });
    const paramsRequest = { ...params, currentPage: eventKey.selected };
    getListMembers(paramsRequest);
  };

  useEffect(() => {
    getListMembers(params);
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const handleSubmitSearch = value => {
    setParams(value);
    getListMembers(value);
  };

  const handleViewDetail = item => {
    history.push(`members/${item.userPhone}`);
  };
  return (
    <>
      <MainLayout>
        <div className="member-page border">
          <Container fluid>
            <TitleHeader title="구매고객관리" />
            <Row>
              <Col sm={12}>
                <ThirdSearch
                  listPage={listPage}
                  handleSubmitSearch={handleSubmitSearch}
                />
              </Col>
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
                  <Col className=" d-flex justify-content-end">
                    <div className="table-status col-8 col-sm-5 col-lg-3 col-md-5 px-0  my-4 number-total">
                      <table className="table table-striped table-bordered text-center mb-0 table-total">
                        <thead>
                          <tr>
                            <th scope="col">총 방문 고객 수</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{`${totalCustomer || 0}명`}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                  <Col sm={12} className="table-price-4">
                    <Table
                      tableHeads={headMember}
                      tableBody={listMembers}
                      onClickRow={handleViewDetail}
                      isShowId
                    />
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
        {totalRows > params.numberRows && (
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalRows / params.numberRows)}
              onPageChange={eventKey => handleSelectPagination(eventKey)}
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
              marginPagesDisplayed={1}
              nextLinkClassName="page-link"
            />
          </Col>
        )}
      </MainLayout>
    </>
  );
};

MemberManagement.defaultProps = {
  getListMembers: () => {}
};

export default memo<Props>(MemberManagement);
