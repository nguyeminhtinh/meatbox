// @flow
import React, { memo } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import ImageBlock from './Image';
import listImages from '../../../mockData/imageCategory';

type Props = {
  handleClickImage: Function,
  imageActive: Object
};
const ModalPopUpImageLanding = ({ handleClickImage, imageActive }: Props) => {
  return (
    <>
      <div className="pb-3 popup-img-category">
        <Row className="list-img">
          <Col xs={12} className="form-img">
            <Tabs defaultActiveKey="small" id="uncontrolled-tab-example">
              <Tab eventKey="small" title="축산물">
                <Row className="custom-img">
                  {listImages.small.map(element => (
                    <ImageBlock
                      elementImg={element}
                      key={element.id}
                      imageActive={imageActive}
                      handleClickImage={handleClickImage}
                    />
                  ))}
                </Row>
              </Tab>
              <Tab eventKey="pig" title="가공품">
                aaa
              </Tab>
              <Tab eventKey="chicken" title="기타">
                sad
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo<Props>(ModalPopUpImageLanding);
