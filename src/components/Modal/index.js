// @flow
// libs
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';

type Props = {
  title: string,
  content: any,
  animation?: boolean,
  isOpen: boolean,
  size?: string,
  handleClose: Function,
  customClass?: string,
  status?: boolean,
  submitForm?: boolean,
  textLeft?: string,
  textRight?: string,
  handleSubmit?: Function,
  handleCloseIco?: Function,
  isShowCloseIco?: boolean,
  isShowFooter?: boolean,
  handleCancel?: Function
};
export const ModalPrimary = ({
  title,
  content,
  animation = false,
  isOpen,
  size,
  handleClose,
  customClass,
  status = false,
  textLeft,
  textRight,
  submitForm = false,
  handleSubmit = () => {},
  handleCloseIco = () => {},
  isShowCloseIco = false,
  isShowFooter = true,
  handleCancel = () => {}
}: Props) => (
  <Modal
    animation={animation}
    onHide={isShowCloseIco ? handleCloseIco : handleClose}
    show={isOpen}
    size={size}
    className={customClass}
  >
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{content}</Modal.Body>
    {isShowFooter && (
      <Modal.Footer>
        {status === false && (
          <Button onClick={handleClose} variant="secondary" type="button">
            확인
          </Button>
        )}

        {status && submitForm && (
          <div>
            <Button
              onClick={handleCancel}
              variant="secondary mr-3"
              type="button"
            >
              {textLeft}
            </Button>
            <Button onClick={handleSubmit} variant="primary" type="button">
              {textRight}
            </Button>
          </div>
        )}
        {status && !submitForm && (
          <div>
            <Button
              onClick={handleClose}
              variant="secondary mr-3"
              type="button"
            >
              {textLeft}
            </Button>
            <Button onClick={handleSubmit} variant="primary" type="button">
              {textRight}
            </Button>
          </div>
        )}
      </Modal.Footer>
    )}
  </Modal>
);
ModalPrimary.defaultProps = {
  animation: false,
  size: '',
  customClass: '',
  status: false,
  submitForm: false,
  textLeft: '',
  textRight: '',
  handleSubmit: () => {},
  isShowCloseIco: false,
  handleCloseIco: () => {},
  isShowFooter: true,
  handleCancel: () => {}
};
export default memo<Props>(ModalPrimary);
