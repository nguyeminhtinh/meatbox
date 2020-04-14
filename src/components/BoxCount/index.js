// @flow
// libs
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import IMAGES from '../../constants/images';

type Props = {
  image: string,
  number: number,
  titleHeader: string,
  iconDetail: boolean,
  OnDetail: string,
  customClass?: string,
  titleLink: string
};
export const BoxCount = ({
  image,
  number,
  customClass = '',
  OnDetail,
  titleLink,
  iconDetail,
  titleHeader
}: Props) => (
  <div
    className={`count ${customClass}`}
    style={{ background: `url(${image})` }}
  >
    <div className="count__item d-flex">
      {number && number > 0 ? (
        <div className="box-text">
          <p className="count__item__number">
            {Number(number).toLocaleString('en')}
          </p>
          <h2>{titleHeader}</h2>
        </div>
      ) : (
        <p className="count__item__text mb-0">현재 데이터가 없습니다.</p>
      )}
    </div>
    <div className="count__title__link">
      {titleLink}
      <Link to={OnDetail} className="count__title__link__detail">
        {iconDetail && <img src={IMAGES.imgDetail} alt="" />}
      </Link>
    </div>
  </div>
);

BoxCount.defaultProps = {
  customClass: ''
};

export default memo<Props>(BoxCount);
