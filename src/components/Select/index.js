// @flow

import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CreatableSelect from 'react-select/creatable';
type Props = {
  placeholder?: string,
  errorMsg?: string,
  label?: string,
  disabled?: boolean,
  isSearchable?: boolean,
  icon?: string,
  onBlur?: Function,
  onChange?: Function,
  defaultValue?: any,
  listItem?: Array<{
    id: number,
    value: any,
    label: string
  }>,
  listOptionString?: Array<{ id: number, name: any }>,
  innerRef?: any,
  noLabel?: boolean,
  value?: any,
  noOptionsMessage?: Function
};

const SelectDropdown = ({
  defaultValue = '',
  placeholder = '',
  errorMsg = '',
  label = '',
  disabled = false,
  isSearchable = false,
  icon = '',
  onBlur = null,
  onChange = () => {},
  listItem = [],
  innerRef = null,
  noLabel = false,
  listOptionString = [],
  value = null,
  noOptionsMessage = () => {}
}: Props) => {
  const currentValue = { label: value, value };
  return (
    <div className="customer-select">
      {!!label && <p className="input__label">{label}</p>}
      <div className="input__box">
        {icon && <FontAwesomeIcon icon={icon} />}
        <Select
          placeholder={placeholder}
          value={value ? currentValue : null}
          ref={innerRef}
          defaultValue={defaultValue}
          onChange={onChange}
          options={
            noLabel
              ? listOptionString.map(item => ({
                  id: item.id,
                  value: item.name,
                  label: item.name
                }))
              : listItem
          }
          blurInputOnSelect={onBlur}
          isDisabled={disabled}
          isSearchable={isSearchable}
          noOptionsMessage={noOptionsMessage}
        />
      </div>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

SelectDropdown.defaultProps = {
  placeholder: '',
  errorMsg: '',
  label: '',
  disabled: false,
  isSearchable: false,
  icon: '',
  onBlur: null,
  onChange: () => {},
  innerRef: null,
  noLabel: false,
  listOptionString: [],
  defaultValue: '',
  listItem: [],
  value: null,
  noOptionsMessage: () => {}
};

export default SelectDropdown;
