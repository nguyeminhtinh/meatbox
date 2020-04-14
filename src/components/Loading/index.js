// @flow
// libs
import React, { memo } from 'react';
import { Spinner } from 'react-bootstrap';

type Props = {
  animation?: string,
  role?: string,
  customClassName?: string,
  text?: string,
  variant?: string,
  size?: string
};

export const Loading = ({
  animation,
  role,
  customClassName = '',
  text,
  variant,
  size
}: Props) => (
  <Spinner animation={animation} role={role} variant={variant} size={size}>
    <span className={customClassName}>{text}</span>
  </Spinner>
);

Loading.defaultProps = {
  animation: 'grow',
  role: 'status',
  customClassName: '',
  text: 'Loading..',
  variant: 'warning',
  size: 'sm'
};

export default memo<Props>(Loading);
