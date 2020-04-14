// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  placeholder?: string,
  value?: string | number,
  errorMsg?: string,
  innerRef?: any,
  label?: string,
  disabled?: boolean,
  icon?: string,
  type?: string,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  onPaste?: Function,
  readOnly?: boolean,
  variant?: 'outline',
  customClassName?: string
};

const Input = ({
  placeholder = '',
  value = '',
  errorMsg = '',
  innerRef = null,
  label = '',
  disabled = false,
  readOnly = false,
  icon = '',
  type = 'text',
  onBlur = null,
  onChange = null,
  customClassName = null,
  onFocus = null,
  variant = 'outline',
  onKeyPress = null,
  onPaste = null
}: Props) => {
  return (
    <div
      className={`input__wrapper ${
        variant !== 'outline' ? ` input__wrapper--${variant}` : ''
      }`}
    >
      {!!label && <p className="input__label">{label}</p>}
      <div className="input__box">
        {icon && <FontAwesomeIcon icon={icon} />}
        <input
          className={`input ${
            variant !== 'outline' ? `input--${variant}` : ''
          } ${customClassName}`}
          defaultValue={value}
          placeholder={placeholder}
          ref={innerRef}
          disabled={disabled}
          type={type}
          onKeyPress={onKeyPress}
          onPaste={onPaste}
          readOnly={readOnly}
          onBlur={e => onBlur && onBlur(e)}
          onFocus={e => onFocus && onFocus(e)}
          onChange={e => onChange && onChange(e.target.value)}
          autoCapitalize="none"
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  errorMsg: '',
  innerRef: null,
  label: '',
  disabled: false,
  readOnly: false,
  icon: '',
  type: 'text',
  onBlur: null,
  onFocus: null,
  onChange: null,
  variant: 'outline',
  customClassName: '',
  onKeyPress: null,
  onPaste: null
};

export default Input;
