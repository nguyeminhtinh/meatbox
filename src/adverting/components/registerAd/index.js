// @flow
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Loading } from 'components/Loading';
import Immutable from 'seamless-immutable';
import { handleOrderList } from 'utils/helpers';
import TitleHeader from '../../../components/TitleHeader';
import MainLayout from '../../../layout/MainLayout';
import AdvertingItem from './AdvertingItem';
import PrimaryButton from '../../../components/Button';
import ModalReview from './ModalReview';
import ModalPrimary from '../../../components/Modal';
// import ERROR_MESSAGE from '../../../constants/errorMsg';
import Radio from '../../../components/Radio';

type Props = {
  getAdvList: Function,
  listAdverting: Array<{
    type: string
  }>,
  type: string,
  saveAdvertings: Function,
  updateStatus: Function,
  deleteAllAdverting: Function,
  isProcessing: boolean,
  isOpenNotify: boolean,
  notifyAccountDenied: Function,
  getStatusAdverting: Function,
  statusResponse: string
};
export const RegisterAd = ({
  getAdvList,
  listAdverting,
  getStatusAdverting,
  type,
  saveAdvertings,
  deleteAllAdverting,
  isProcessing,
  updateStatus,
  isOpenNotify,
  notifyAccountDenied,
  statusResponse
}: Props) => {
  const [isOpenPopupAddMenu, setIsOpenPopupAddMenu] = useState(false);

  const [status, setStatus] = useState('image');

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);

  const [popupConfirmApply, setpopupConfirmApply] = useState({
    isShow: false,
    content: <ModalReview />
  });
  const [popupNoData, setpopupNoData] = useState({
    isShow: false,
    content: ''
  });

  const [popupSuccess, setPopupSuccess] = useState(false);
  const [isChangeIdx, setIsChangeIdx] = useState(false);
  const [popupReview, setPopupReview] = useState({
    isShow: false,
    content: ''
  });

  const [listItem, setListItem] = useState([]);
  const [save, setSave] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isOpenNoTitle, setIsOpenNoTitle] = useState(false);

  const clickApply = listData => {
    const check = listData.filter(
      item => item.path === '' || item.path === null
    );
    const checks = listData.filter(
      item => item.title === '' || item.title === null
    );

    if (check && check.length > 0) {
      setpopupNoData({
        isShow: true,
        content: `'파일찾기' 버튼을 눌러 파일을 업로드해주세요.`
      });
    } else if (checks && checks.length > 0) {
      setIsOpenNoTitle(true);
    } else {
      setpopupConfirmApply({
        isShow: true,
        content: '적용하시겠습니까?'
      });
    }
  };

  const clickPopupReview = () => {
    setPopupReview({
      isShow: true,
      content: <ModalReview listAdverting={listItem} />
    });
  };

  useEffect(() => {
    getStatusAdverting();
  }, [statusResponse]);

  useEffect(() => {
    getAdvList(status);
  }, [status]);

  useEffect(() => {
    switch (type) {
      case 'GET_ADV_LIST_SUCCESS':
        setListItem(
          listAdverting.length > 0 ? Immutable.asMutable(listAdverting) : []
        );
        if (listAdverting.length > 0) {
          setStatus(listAdverting[0].type);
        }
        break;
      case 'SAVE_ADVERTINGS_SUCCESS':
        // setpopupConfirmApply({
        //   isShow: true,
        //   content: '적용되었습니다.'
        // });
        setPopupSuccess(true);
        getAdvList(status);
        break;
      case 'DELETE_ALL_ADVERTING_SUCCESS':
        getAdvList(status);
        break;
      case 'GET_STATUS_ADVERTING_SUCCESS':
        setStatus(statusResponse);
        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
  }, [isOpenNotify]);

  const handleSubmitForm = () => {
    /**
     * Data update
     */
    setpopupNoData({
      isShow: false
    });
    setpopupConfirmApply({
      ...popupConfirmApply,
      isShow: false
    });

    // setApply(true);
  };
  const handleOnchangeStatusRadio = e => {
    const { name } = e.target;
    getAdvList(name);
    setStatus(name);
    setListItem([]);
  };
  const handleClose = () => {
    setIsOpenPopupAddMenu(false);
    setSave(false);
    setPopupReview({
      ...popupReview,
      isShow: false
    });
  };

  const handleClickAddMenu = () => {
    if (listItem.length < 5 && status === 'image') {
      setListItem([
        ...listItem,
        {
          idx: Math.random(),
          title: '',
          path: '',
          type: 'image'
        }
      ]);
    } else if (listItem.length < 3 && status === 'video') {
      setListItem([
        ...listItem,
        {
          idx: Math.random(),
          title: '',
          path: '',
          type: 'video'
        }
      ]);
    } else {
      setIsOpenPopupAddMenu(true);
    }
  };

  const handleDeleteItem = idx => {
    const removedItems = listItem.filter((item, index) => idx !== index);
    setListItem(removedItems);
  };

  const handleDeleteAll = () => {
    setIsConfirm(true);
  };
  const handleOrderItem = (idx, position) => {
    let listChange = listItem;

    if (status === 'image') {
      switch (position) {
        case 'up':
          if (listChange.length > 1) {
            if (idx === 0) {
              return;
            }
            if (idx === 1 || idx === 2 || idx === 3 || idx === 4) {
              listChange = handleOrderList(listChange, idx, idx - 1);
              setIsChangeIdx(!isChangeIdx);
            }
          }

          setListItem(listChange);
          break;
        case 'down':
          if (listChange.length > 1) {
            if (
              idx === 4 ||
              (idx === 1 && listChange.length === 2) ||
              (idx === 2 && listChange.length === 3) ||
              (idx === 3 && listChange.length === 4) ||
              (idx === 4 && listChange.length === 5)
            ) {
              return;
            }
            if (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4) {
              listChange = handleOrderList(listChange, idx, idx + 1);
              setIsChangeIdx(!isChangeIdx);
            }
          }
          setListItem(listChange);
          break;
        default:
          break;
      }
    } else {
      switch (position) {
        case 'up':
          if (listChange.length > 1) {
            if (idx === 0) {
              return;
            }
            if (idx === 1 || idx === 2 || idx === 3) {
              listChange = handleOrderList(listChange, idx, idx - 1);
              setIsChangeIdx(!isChangeIdx);
            }
          }
          setListItem(listChange);
          break;
        case 'down':
          if (listChange.length > 1) {
            if (
              idx === 4 ||
              (idx === 1 && listChange.length === 2) ||
              (idx === 2 && listChange.length === 3)
            ) {
              return;
            }
            if (idx === 0 || idx === 1) {
              listChange = handleOrderList(listChange, idx, idx + 1);
              setIsChangeIdx(!isChangeIdx);
            }

            if (idx === 2) {
              return;
            }
          }
          setListItem(listChange);
          break;
        default:
          break;
      }
    }
  };

  const handleChangeInput = (value, idx) => {
    const itemChange = listItem.find((item, index) => index === idx);

    const listItemChange = listItem.map(item => {
      return item.idx === itemChange.idx
        ? {
            ...item,
            title: value
          }
        : item;
    });

    setListItem(listItemChange);
  };

  const handleChangeFile = (e, idx) => {
    const itemChange = listItem.find((item, index) => index === idx);
    let pathUpload;
    if (
      e &&
      e.target &&
      e.target.validity &&
      e.target.validity &&
      e.target.files &&
      e.target.files[0]
    ) {
      pathUpload = (window.URL || window.webkitURL).createObjectURL(
        e.target.files[0]
      );
      switch (idx) {
        case 0:
          setFile1(e.target.files[0]);
          break;
        case 1:
          setFile2(e.target.files[0]);
          break;
        case 2:
          setFile3(e.target.files[0]);
          break;
        case 3:
          setFile4(e.target.files[0]);
          break;
        case 4:
          setFile5(e.target.files[0]);
          break;
        default:
          break;
      }
    }

    const listItemChange = listItem.map(item => {
      return item.idx === itemChange.idx
        ? {
            ...item,
            path: pathUpload,
            fileName:
              e && e.target && e.target.files[0] && e.target.files[0].name
                ? e.target.files[0].name
                : ''
          }
        : item;
    });

    setListItem(listItemChange);
  };

  const handleSubmitApply = () => {
    let isNoTitle = false;
    if (listItem.length > 0) {
      const formData = new window.FormData();
      if (listItem && listItem[0]) {
        if (listItem && listItem[0] && listItem[0].title) {
          // upload 1
          if (listItem && listItem[0] && listItem[0].id) {
            formData.append('advertisementRequestDtos[0].id', listItem[0].id);
          }
          if (listItem && listItem[0] && listItem[0].type) {
            formData.append('advertisementRequestDtos[0].type', status);
          }
          if (file1 && listItem && listItem[0] && listItem[0].fileName) {
            formData.append('advertisementRequestDtos[0].file', file1);
          }
          if (listItem && listItem[0] && listItem[0].type) {
            formData.append(
              'advertisementRequestDtos[0].title',
              listItem && listItem[0] && listItem[0].title
                ? listItem[0].title
                : ''
            );
          }
        } else {
          isNoTitle = true;
          setIsOpenNoTitle(true);
        }
      }

      // object upload 2
      if (listItem && listItem[1]) {
        if (listItem && listItem[1] && listItem[1].title) {
          if (listItem && listItem[1] && listItem[1].id) {
            formData.append('advertisementRequestDtos[1].id', listItem[1].id);
          }
          if (listItem && listItem[1] && listItem[1].type) {
            formData.append('advertisementRequestDtos[1].type', status);
          }
          if (file2 && listItem && listItem[1] && listItem[1].fileName) {
            formData.append('advertisementRequestDtos[1].file', file2);
          }
          if (listItem && listItem[1] && listItem[1].type) {
            formData.append(
              'advertisementRequestDtos[1].title',
              listItem && listItem[1] && listItem[1].title
                ? listItem[1].title
                : ''
            );
          }
        } else {
          isNoTitle = true;
          setIsOpenNoTitle(true);
        }
      }

      // upload 3
      if (listItem && listItem[2]) {
        if (listItem && listItem[2] && listItem[2].title) {
          if (listItem && listItem[2] && listItem[2].id) {
            formData.append('advertisementRequestDtos[2].id', listItem[2].id);
          }
          if (listItem && listItem[2] && listItem[2].type) {
            formData.append('advertisementRequestDtos[2].type', status);
          }
          if (file3 && listItem && listItem[2] && listItem[2].fileName) {
            formData.append('advertisementRequestDtos[2].file', file3);
          }
          if (listItem && listItem[2] && listItem[2].type) {
            formData.append(
              'advertisementRequestDtos[2].title',
              listItem && listItem[2] && listItem[2].title
                ? listItem[2].title
                : ''
            );
          }
        } else {
          isNoTitle = true;
          setIsOpenNoTitle(true);
        }
      }

      // upload 4
      if (listItem && listItem[3]) {
        if (listItem && listItem[3] && listItem[3].title) {
          if (listItem && listItem[3] && listItem[3].id) {
            formData.append('advertisementRequestDtos[3].id', listItem[3].id);
          }

          if (listItem && listItem[3] && listItem[3].type) {
            formData.append('advertisementRequestDtos[3].type', status);
          }
          if (file4 && listItem && listItem[3] && listItem[3].fileName) {
            formData.append('advertisementRequestDtos[3].file', file4);
          }

          if (listItem && listItem[3] && listItem[3].type) {
            formData.append(
              'advertisementRequestDtos[3].title',
              listItem && listItem[3] && listItem[3].title
                ? listItem[3].title
                : ''
            );
          }
        } else {
          isNoTitle = true;
          setIsOpenNoTitle(true);
        }
      }

      // upload 5
      if (listItem && listItem[4]) {
        if (listItem && listItem[4] && listItem[4].title) {
          if (listItem && listItem[4] && listItem[4].id) {
            formData.append('advertisementRequestDtos[4].id', listItem[4].id);
          }

          if (listItem && listItem[4] && listItem[4].type) {
            formData.append('advertisementRequestDtos[4].type', status);
          }

          if (file5 && listItem && listItem[4] && listItem[4].fileName) {
            formData.append('advertisementRequestDtos[4].file', file5);
          }
          if (listItem && listItem[4] && listItem[4].type) {
            formData.append(
              'advertisementRequestDtos[4].title',
              listItem && listItem[4] && listItem[4].title
                ? listItem[4].title
                : ''
            );
          }
        } else {
          isNoTitle = true;
          setIsOpenNoTitle(true);
        }
      }

      if (!isNoTitle) {
        updateStatus(status);
        saveAdvertings(formData);
      }
    } else {
      deleteAllAdverting({ type: status });
    }
  };

  const renderListMenu = () => {
    return (
      listItem &&
      listItem.map((item, index) => (
        <AdvertingItem
          key={item && item.id}
          // {...item}
          handleDeleteItem={handleDeleteItem}
          nameImg={item && item.imageUpload}
          item={item}
          idx={index}
          handleOrderItem={handleOrderItem}
          // disabled={apply}
          status={status}
          handleChangeInput={handleChangeInput}
          handleChangeFile={handleChangeFile}
          // title={title}
        />
      ))
    );
  };

  const handleSave = () => {
    setIsConfirm(true);
  };

  return (
    <>
      <MainLayout>
        <div className="home-main">
          <Container fluid>
            <TitleHeader title="광고관리" />
            <Row className="m-1">
              <Col sm={12} className="p-0">
                <div className="wrap-btn-action float-right">
                  {save && (
                    <PrimaryButton
                      type="button"
                      variant="secondary btn-custom"
                      onClick={() => handleSave()}
                    >
                      저장
                    </PrimaryButton>
                  )}
                  <PrimaryButton
                    type="button"
                    variant="secondary btn-custom ml-3"
                    onClick={clickPopupReview}
                    disabled={listItem.length === 0 ? true : ''}
                  >
                    미리보기
                  </PrimaryButton>
                </div>
              </Col>
              <Col sm={12} className="wrapper-list-adverting mb-2 mt-5 ">
                <div className="title__header">
                  <h1>광고등록현황</h1>
                </div>
                <div className="adverting-type d-flex">
                  <Radio
                    onChange={event => handleOnchangeStatusRadio(event)}
                    id="image"
                    isChecked={status === 'image'}
                    labelRadio="이미지"
                    name="image"
                  />
                  <Radio
                    onChange={event => handleOnchangeStatusRadio(event)}
                    id="video"
                    isChecked={status === 'video'}
                    labelRadio="동영상"
                    name="video"
                  />
                </div>
                <div className="list-adverting">
                  <div className="row-item d-flex item-label align-items-center">
                    <div className="row-item__no" />
                    <div className="row-item__image">이미지 </div>
                    <div className="row-item__title">제목 </div>
                    <div className="row-item__file">파일첨부</div>
                    <div className="row-item__btn-action text-center">
                      <PrimaryButton
                        type="button"
                        variant="primary btn-custom"
                        onClick={() => {
                          handleClickAddMenu();
                        }}
                      >
                        +메뉴추가
                      </PrimaryButton>
                    </div>
                  </div>
                  {isProcessing ? (
                    <div className="wrapper-loading custom-position">
                      <Loading
                        animation="grow"
                        role="status"
                        className=""
                        text=""
                        variant="dark"
                        size="lg"
                        true
                      />
                    </div>
                  ) : (
                    // </div>
                    renderListMenu()
                  )}

                  <div className="wrapper-btn float-right mt-3">
                    <PrimaryButton
                      type="button"
                      variant="secondary btn-custom "
                      onClick={handleDeleteAll}
                      // disabled={listItem.length === 0 ? true : ''}
                    >
                      전체삭제
                    </PrimaryButton>
                    <PrimaryButton
                      type="button"
                      variant="secondary btn-custom ml-3"
                      onClick={() => clickApply(listItem)}
                      // disabled={listItem.length === 0 ? true : ''}
                    >
                      적용하기
                    </PrimaryButton>
                  </div>

                  {/**

                    {listItem && listItem.length > 0 && status === 'video' && (
                      <div className="wrapper-btn float-right mt-3">
                        <PrimaryButton
                          type="button"
                          variant="secondary btn-custom ml-3"
                          onClick={() => {
                            clickApply();
                          }}
                        >
                          적용하기
                        </PrimaryButton>
                      </div>
                    )}
                  */}
                </div>
              </Col>
            </Row>
            {status === 'image' && (
              <>
                <ModalPrimary
                  title="알림"
                  content={`파일은 최대 5개까지
                  등록 가능합니다`}
                  isOpen={isOpenPopupAddMenu}
                  handleClose={() => {
                    handleClose();
                  }}
                />
                <ModalPrimary
                  title="미리보기"
                  content={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <ModalReview
                      listAdverting={listItem}
                      statusAccept="image"
                    />
                  }
                  isOpen={popupReview.isShow}
                  handleClose={() => {
                    handleClose();
                  }}
                  customClass="modal-review"
                />
              </>
            )}
            {status === 'video' && (
              <>
                <ModalPrimary
                  title="알림"
                  content={`파일은 최대 3개까지
                  등록 가능합니다.`}
                  isOpen={isOpenPopupAddMenu}
                  handleClose={() => {
                    handleClose();
                  }}
                />
                <ModalPrimary
                  title="미리보기"
                  content={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <ModalReview
                      listAdverting={listItem}
                      statusAccept="video"
                    />
                  }
                  isOpen={popupReview.isShow}
                  handleClose={() => {
                    handleClose();
                  }}
                  customClass="modal-review"
                />
              </>
            )}
            <ModalPrimary
              title="알림"
              content={popupConfirmApply.content}
              isOpen={popupConfirmApply.isShow}
              handleClose={() => {
                handleSubmitForm();
                handleSubmitApply();
              }}
              isShowCloseIco
              handleCloseIco={() => {
                setpopupConfirmApply(false);
              }}
            />
            <ModalPrimary
              title="알림"
              content="적용되었습니다"
              isOpen={popupSuccess}
              handleClose={() => {
                setPopupSuccess(false);
              }}
              isShowCloseIco
              handleCloseIco={() => {
                setPopupSuccess(false);
              }}
            />
            <ModalPrimary
              title="알림"
              content={popupNoData.content}
              isOpen={popupNoData.isShow}
              handleClose={() => {
                handleSubmitForm();
              }}
            />

            <ModalPrimary
              title="알림"
              content="삭제 하시겠습니까?"
              isOpen={isConfirm}
              handleClose={() => {
                setIsConfirm(false);
                deleteAllAdverting({ type: status });
              }}
              isShowCloseIco
              handleCloseIco={() => {
                setIsConfirm(false);
              }}
            />
            <ModalPrimary
              title="알림"
              content="제목을 입력해주세요."
              isOpen={isOpenNoTitle}
              handleClose={() => {
                setIsOpenNoTitle(false);
              }}
            />
          </Container>
        </div>
      </MainLayout>
    </>
  );
};

export default memo<Props>(RegisterAd);
