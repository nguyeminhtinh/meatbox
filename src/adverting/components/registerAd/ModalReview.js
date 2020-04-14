// @flow
// libs
import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import Video from 'components/Video';

type Props = {
  listAdverting: Array<{
    path: string
  }>,
  statusAccept: string
};

export const ModalReview = ({
  listAdverting,
  statusAccept = 'image'
}: Props) => {
  const renderListPreview =
    listAdverting &&
    listAdverting.map(item =>
      statusAccept === 'image' ? (
        <>
          {item.path === '' ? (
            <Col xs={12} sm={3}>
              <p className="w-100">데이터가 없습니다.</p>
            </Col>
          ) : (
            <Col xs={12} sm={3}>
              <img src={item.path} alt="imgPreview" className="img-adverting" />
            </Col>
          )}
        </>
      ) : (
        <>
          {item.path === '' ? (
            <Col xs={12} sm={4}>
              <p>데이터가 없습니다.</p>
            </Col>
          ) : (
            <Col xs={12} sm={4}>
              <Video
                src={item.path}
                alt="imgPreview"
                className="img-adverting"
              />
            </Col>
          )}
        </>
      )
    );
  return <div className="row__custom content-box-ad">{renderListPreview}</div>;
};

export default memo<Props>(ModalReview);
