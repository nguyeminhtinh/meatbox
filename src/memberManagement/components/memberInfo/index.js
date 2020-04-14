// @flow
// libs
import React, { useEffect, memo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import Loading from 'components/Loading';
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'components/Table';
import { headInfoMember } from '../../../constants/headerTable';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
// import { formatValue } from '../../../utils/Validators';

type Props = {
  getMembersDetail: Function,
  membersDetail: Array<{}>,
  isProcessing: boolean,
  totalRows: number,
  point: number,
  match: {
    params: {
      id: any
    }
  },
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};

export const MemberDetail = ({
  getMembersDetail,
  membersDetail,
  isProcessing,
  totalRows,
  point,
  match,
  isOpenNotify,
  notifyAccountDenied
}: Props) => {
  const { id } = match.params;
  const [params, setParams] = useState({
    numberRows: 10,
    currentPage: 0,
    userPhone: id
  });
  const handleSelectPagination = eventKey => {
    setParams({ ...params, currentPage: eventKey.selected });
    const paramsRequest = { ...params, currentPage: eventKey.selected };
    getMembersDetail(paramsRequest);
  };

  useEffect(() => {
    getMembersDetail(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  return (
    <>
      <MainLayout>
        <div className="home-main">
          <Container fluid>
            <TitleHeader title="구매고객정보" />
            <Row>
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
                  <Col sm={12}>
                    <div className="total">
                      <div className="total__title">총 적립금</div>
                      <div className="total__money">
                        <p>
                          {point || 0}
                          <span>점</span>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12} className="table-price-4">
                    <div className="phoneMember">
                      <p className="label-phone">핸드폰번호</p>
                      <p className="number-phone">{id}</p>
                    </div>
                    <Table
                      tableHeads={headInfoMember}
                      tableBody={membersDetail}
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

export default withRouter(memo<Props>(MemberDetail));
