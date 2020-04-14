// @flow
// libs
import React, { memo, useState, useEffect } from 'react';
import SelectDropdown from 'components/Select';
import Button from 'components/Button';
import { Row, Col } from 'react-bootstrap';
import ModalPrimary from 'components/Modal';
import ERROR_MESSAGE from 'constants/errorMsg';
import InputChange from 'components/Input/InputChange';

type Props = {
  categoryProduct: Array<{
    id: number,
    label: string,
    value: string
  }>,
  handleSubmitAdd: Function,
  isValueDefault: boolean
};

export const ProductImageSearch = ({
  categoryProduct,
  handleSubmitAdd = () => {},
  isValueDefault
}: Props) => {
  const initSearch = {
    categoryId: '',
    categoryLabel: ''
  };
  const [fileName, setFileName] = useState('');
  const [imageName, setImageName] = useState('');
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
    if (!file && !objectSubmit.categoryId && imageName.length === 0) {
      setPopupClose({
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_CATEGORY_ADD_IMG
      });
    } else if (!file) {
      setPopupClose({
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_CATEGORY
      });
    } else if (!objectSubmit.categoryId) {
      setPopupClose({
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_IMG
      });
    } else if (imageName.trim() === '') {
      setPopupClose({
        isShow: true,
        content: '이미지명을 입력해주세요.'
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
        formData.append('imageName', imageName);
        formData.append('image', imageUpload);
        formData.append('categoryId', objectSubmit.categoryId);
        formData.append('self', false);
        handleSubmitAdd(formData);
      }
    }
  };

  useEffect(() => {
    setObjectSubmit({
      categoryLabel: ''
    });
    setFileName('');
    setImageName('');
    setImageUpload(null);
  }, [isValueDefault]);
  return (
    <div className="form-search d-block">
      <div className="form-search__landing">
        <Row>
          <Col lg={6} md={6} className="mb">
            <Row className="align-items-center">
              <Col md={3} lg={3} xs={12}>
                <p className="form-search__title">카테고리 </p>
              </Col>
              <Col md={9} lg={9} xs={12}>
                <SelectDropdown
                  listItem={categoryProduct}
                  placeholder="카테고리 선택"
                  value={objectSubmit.categoryLabel}
                  onChange={e => handleSelectChange(e, 'categoryId')}
                  noOptionsMessage={() => '옵션 없음'}
                />
              </Col>
            </Row>
          </Col>

          <Col lg={6} md={6} className="mb">
            <Row className="align-items-center">
              <Col md={3} lg={3} xs={12}>
                <p className="form-search__title">이미지명 </p>
              </Col>
              <Col md={9} lg={9} xs={12}>
                <input
                  type="text"
                  className="form-control"
                  value={imageName}
                  onChange={e => setImageName(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} className="mb">
            <Row className="align-items-center">
              <Col md={3} lg={3} xs={12}>
                <p className="form-search__title">이미지파일 </p>
              </Col>
              <Col md={9} lg={9} xs={12}>
                <div className="d-flex form">
                  <InputChange
                    onChange={() => {}}
                    placeholder=""
                    type="text"
                    value={fileName}
                    readOnly
                  />
                  <div className="group-btn-file w-auto ml-0">
                    <input
                      type="file"
                      className="custom-file-input"
                      value=""
                      onChange={e => handleChangeFile(e)}
                      accept="image/jpg, image/jpeg, image/png"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={() => {}}
                    >
                      이미지찾기
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={12} lg={12} xs={12} className="mt-2">
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
            setFileName('');
            setImageName('');
            setObjectSubmit({
              categoryLabel: ''
            });
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

ProductImageSearch.defaultProp = {
  handleSubmitAdd: () => {}
};
export default memo<Props>(ProductImageSearch);
