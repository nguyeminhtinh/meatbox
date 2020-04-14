// @flow
// libs
import React, { memo, useState, useEffect } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import { Row, Col } from 'react-bootstrap';
import ModalPrimary from 'components/Modal';
import ERROR_MESSAGE from 'constants/errorMsg';

type Props = {
  categoryProduct: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitAdd: Function,
  isValueDefault: boolean
};

export const ProductLandingSearch = ({
  categoryProduct,
  handleSubmitAdd = () => {},
  isValueDefault
}: Props) => {
  const initSearch = {
    categoryId: '',
    categoryLabel: ''
  };
  const [fileName, setFileName] = useState(null);
  const [popupClose, setPopupClose] = useState({
    isShow: false,
    content: ''
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [objectSubmit, setObjectSubmit] = useState(initSearch);
  const [popupConfirmAdd, setPopupConfirmAdd] = useState({
    isShow: false
  });
  const handleSelectChange = (option, name) => {
    const { value, label } = option;
    switch (name) {
      case 'categoryId':
        setObjectSubmit({
          categoryId: value,
          categoryLabel: label
        });
        break;
      default:
        setObjectSubmit({
          ...objectSubmit,
          [name]: value
        });
    }
  };

  const clickAdd = file => {
    if (!file || !objectSubmit.categoryId) {
      setPopupClose({
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_CATEGORY
      });
    } else {
      setPopupConfirmAdd({
        isShow: true,
        content: ERROR_MESSAGE.CONFIRM_REGISTER
      });
    }
  };

  const handleChangeFile = e => {
    if (e.target.validity.valid && e.target.files[0]) {
      setImageUpload(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitForm = () => {
    const formData = new window.FormData();
    setPopupConfirmAdd({
      ...popupConfirmAdd,
      isShow: false
    });
    if (imageUpload) {
      if (imageUpload.size > 4000000) {
        setPopupConfirmAdd({
          ...popupConfirmAdd,
          isShow: true,
          content: '이 파일은 너무 큽니다'
        });
      } else {
        formData.append('image', imageUpload);
        formData.append('categoryId', objectSubmit.categoryId);
        handleSubmitAdd(formData);
      }
    }
  };

  useEffect(() => {
    setObjectSubmit({
      categoryLabel: ''
    });
    setFileName(null);
  }, [isValueDefault]);
  return (
    <div className="form-search d-block">
      <div className="form-search__landing">
        <Row>
          <Col md={2} lg={1} xs={12}>
            <p className="form-search__title">카테고리 </p>
          </Col>
          <Col md={3} xs={12}>
            <SelectDropdown
              listItem={categoryProduct}
              placeholder="카테고리 선택"
              value={objectSubmit.categoryLabel}
              onChange={e => handleSelectChange(e, 'categoryId')}
              noOptionsMessage={() => '옵션 없음'}
            />
          </Col>
          <Col md={5} xs={12}>
            <div className="d-flex form form-upload">
              <input
                type="file"
                className="custom-file-input"
                lang="ko"
                onChange={handleChangeFile}
                accept="image/jpg, image/jpeg, image/png"
              />
              <p className="custom-file-label label-upload">{fileName}</p>
            </div>
          </Col>
          <Col md={2} lg={3} xs={12}>
            <div className="text-right">
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  clickAdd(fileName);
                }}
              >
                등록
              </Button>
            </div>
          </Col>
        </Row>
        {/* Add category */}
        <ModalPrimary
          title="알림"
          content={popupConfirmAdd.content}
          isOpen={popupConfirmAdd.isShow}
          submitForm
          textLeft="확인"
          textRight="취소"
          isShowCloseIco
          handleCloseIco={() => {
            setPopupConfirmAdd({
              ...popupConfirmAdd,
              isShow: false
            });
          }}
          status
          handleSubmit={() => {
            setPopupConfirmAdd({
              ...popupConfirmAdd,
              isShow: false
            });
          }}
          handleCancel={() => {
            handleSubmitForm();
          }}
        />
        {/* /Check validate */}
        <ModalPrimary
          title="알림"
          content={popupClose.content}
          isOpen={popupClose.isShow}
          handleClose={() => {
            setPopupClose(false);
          }}
        />
      </div>
    </div>
  );
};

ProductLandingSearch.defaultProp = {
  handleSubmitAdd: () => {}
};
export default memo<Props>(ProductLandingSearch);
