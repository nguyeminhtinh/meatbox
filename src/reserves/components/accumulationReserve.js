// @flow
/* eslint-disable react/no-find-dom-node */

import React, { useState, useRef, memo } from 'react';
import Input from 'components/Input';
import { isNumberKey, isOnPasteNumber } from 'constants/validate';
import Button from '../../components/Button';
import ERROR_MESSAGE from '../../constants/errorMsg';

type Props = {
  handleModalAccumulation: Function
};

const Accumulation = ({ handleModalAccumulation }: Props) => {
  const [textValidate, setTextValidate] = useState({
    content: '',
    bonusRate: ''
  });
  const bonusRateRef = useRef('');
  const handleSubmit = () => {
    const numberBonusRate = bonusRateRef.current
      ? bonusRateRef.current.value
      : null;
    if (!numberBonusRate) {
      setTextValidate({
        ...textValidate,
        bonusRate: ERROR_MESSAGE.REQUIRED
      });
      return;
    }
    if (
      // eslint-disable-next-line no-restricted-globals
      isNaN(numberBonusRate) ||
      Number(numberBonusRate) > 100
    ) {
      setTextValidate({
        ...textValidate,
        bonusRate: '적립율 설정(0~100%)'
      });
      return;
    }
    const dataSubmit = {
      bonusRate: Number(numberBonusRate),
      type: 'constant'
    };
    handleModalAccumulation(dataSubmit);
  };

  return (
    <div className="w-100">
      <div className="setting-money">
        <p className="setting-money__title">고정 적립율 설정(0~100%)</p>
        <Input
          placeholder=""
          type="text"
          onKeyPress={e => isNumberKey(e)}
          onPaste={e => isOnPasteNumber(e)}
          inputMode="numeric"
          onFocus={() => {
            setTextValidate({
              ...textValidate,
              bonusRate: ''
            });
          }}
          pattern="[0-9]*"
          innerRef={bonusRateRef}
        />
        {textValidate.bonusRate && (
          <p className="error-msg mb-0">{textValidate.bonusRate}</p>
        )}
      </div>
      <div className="mt-5 text-center">
        <Button onClick={handleSubmit} variant="secondary" type="button">
          확인
        </Button>
      </div>
    </div>
  );
};

export default memo<Props>(Accumulation);
