// @flow

import React, { memo } from 'react';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Video from 'components/Video';

import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
  idx: number,
  // id?: any,
  handleDeleteItem: Function,
  handleOrderItem: Function,
  disabled?: boolean,
  status: string,
  item: Object,
  handleChangeInput: Function,
  handleChangeFile: Function
};
const AdvertingItem = ({
  handleDeleteItem,
  idx,
  handleOrderItem,
  disabled = false,
  item,
  status = 'image',
  handleChangeInput,
  handleChangeFile
}: Props) => {
  const renderImg = () => {
    if (status === 'video') {
      return <Video src={item && item.path} />;
    }
    return (
      <img
        className="img-adverting"
        src={item && item.path}
        alt="이미지, 동영상 영역"
      />
    );
  };

  return (
    <div>
      <div className="row-item d-flex align-items-center">
        <div className="row-item__no text-center">
          <div className="middle-content ">
            <PrimaryButton
              className="mb-1"
              size="sm"
              type="button"
              variant="secondary"
              onClick={() => handleOrderItem(idx, 'up')}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </PrimaryButton>
            <PrimaryButton
              size="sm"
              variant="secondary"
              type="button"
              onClick={() => handleOrderItem(idx, 'down')}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </PrimaryButton>
          </div>
        </div>
        <div className="row-item__image d-flex">
          <div className="images mr-2">
            {item && item.path && renderImg()}
            {item && !item.path && status === 'image' && (
              <p className="text-center d-flex align-items-center justify-content-center h-100">
                이미지 영역
              </p>
            )}
            {item && !item.path && status === 'video' && (
              <p className="text-center d-flex align-items-center justify-content-center h-100">
                동영상 영역
              </p>
            )}
          </div>
        </div>
        <div className="row-item__title d-flex">
          <Input
            type="text"
            disabled={disabled}
            onChange={value => handleChangeInput(value, idx)}
            value={item && item.title}
          />
        </div>
        <div className="row-item__file">
          <div className="custom-file" id="customFile">
            {status === 'video' && (
              <input
                type="file"
                className="custom-file-input"
                lang="ko"
                onChange={e => handleChangeFile(e, idx)}
                disabled={disabled}
                accept="video/mp4,video/avi,video/flv"
              />
            )}

            {status === 'image' && (
              <input
                type="file"
                className="custom-file-input"
                lang="ko"
                onChange={e => handleChangeFile(e, idx)}
                disabled={disabled}
                accept="image/jpg, image/jpeg, image/png"
              />
            )}
            <p className="custom-file-label">
              {item &&
                item.path &&
                item.path.replace(
                  `${
                    process.env.REACT_APP_IMG_URL
                      ? process.env.REACT_APP_IMG_URL
                      : ''
                  }`,
                  ''
                )}
            </p>
          </div>
        </div>
        <div className="row-item__btn-action text-center">
          <PrimaryButton
            className="btn btn-danger"
            onClick={() => handleDeleteItem(idx)}
            type="button"
          >
            삭제
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

AdvertingItem.defaultProps = {
  disabled: false
};

export default memo<Props>(AdvertingItem);
