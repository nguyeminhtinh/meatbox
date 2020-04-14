// @flow
import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
// import imageCategory from '../../../mockData/imageCategory';
import Button from 'components/Button';
import { Loading } from 'components/Loading';
import { getCategoryNameById } from 'utils/helpers';
import ImageBlock from './Image';

type Props = {
  handleSelectImage: Function,
  // imageActive: Object,
  getImageCategory?: Function,
  categoryId: number,
  imageList: Array<{
    id: string
  }>,
  imageListAuthor: Array<{
    id: string
  }>,
  getImageCategoryAuthor?: Function,
  isProcessing: boolean,
  categoriesOptions: Array<{}>,
  isOpenNotify: boolean,
  notifyAccountDenied: Function
};
const ModalPopUpImage = ({
  handleSelectImage,
  getImageCategory = () => {},
  categoryId,
  imageList,
  isProcessing,
  categoriesOptions,
  isOpenNotify,
  notifyAccountDenied,
  imageListAuthor,
  getImageCategoryAuthor = () => {}
}: Props) => {
  useEffect(() => {
    getImageCategory(categoryId);
    getImageCategoryAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    if (isOpenNotify) {
      notifyAccountDenied();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenNotify]);

  const [imgSelector, setImgSelectore] = useState(null);

  const handleGetImageSelector = item => {
    setImgSelectore(item);
  };

  const titleCategory = getCategoryNameById(categoriesOptions, categoryId);

  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <div className="pb-3 popup-img-category">
        <Row className="list-img">
          <Col xs={12} className="form-img">
            <Tabs defaultActiveKey="small" id="uncontrolled-tab-example">
              <Tab
                eventKey="small"
                title={titleCategory && titleCategory.label}
                // title="자체상품"
              >
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
                  <Row className="custom-img">
                    {imageList && imageList.length > 0 ? (
                      imageList &&
                      imageList.map(element => (
                        <ImageBlock
                          elementImg={element}
                          key={element.id}
                          handleGetImageSelector={handleGetImageSelector}
                          imgSelector={imgSelector}
                        />
                      ))
                    ) : (
                      <p className="d-flex justify-content-center w-100 p-5">
                        데이터 없습니다
                      </p>
                    )}
                  </Row>
                )}
              </Tab>
              {categoryId === 9999 && (
                <Tab eventKey="pig" title="직접등록한 이미지">
                  {isProcessing ? (
                    <div className="wrapper-loading h-100">
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
                    <Row className="custom-img">
                      {imageListAuthor && imageListAuthor.length > 0 ? (
                        imageListAuthor &&
                        imageListAuthor.map(element => (
                          <ImageBlock
                            elementImg={element}
                            key={element.id}
                            handleGetImageSelector={handleGetImageSelector}
                            imgSelector={imgSelector}
                          />
                        ))
                      ) : (
                        <p className="d-flex justify-content-center w-100 p-5">
                          데이터 없습니다
                        </p>
                      )}
                    </Row>
                  )}
                </Tab>
              )}
            </Tabs>
          </Col>
        </Row>
        <Row className="btn-confirm">
          <Button
            onClick={() => handleSelectImage(imgSelector)}
            variant="secondary"
            type="button"
          >
            확인
          </Button>
        </Row>
      </div>
    </React.Fragment>
  );
};

ModalPopUpImage.defaultProps = {
  getImageCategory: () => {},
  getImageCategoryAuthor: () => {}
};

export default memo<Props>(ModalPopUpImage);
