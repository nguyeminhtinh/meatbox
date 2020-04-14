// @flow
/* eslint-disable react/no-find-dom-node */

import React, { useState, useRef, useEffect, memo } from 'react';
import Input from 'components/Input';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { validator } from 'utils/Validators';
import { isNumberKey, isOnPasteNumber } from 'constants/validate';
import Button from '../../components/Button';
import ERROR_MESSAGE from '../../constants/errorMsg';

registerLocale('ko', ko);

type Props = {
  handleModalSetting: Function
};

const MaintenanceHistory = ({ handleModalSetting }: Props) => {
  const [textValidate, setTextValidate] = useState({
    content: '',
    bonusRate: ''
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const bonusRateRef = useRef('');

  const handleChangeStartDay = value => {
    setTextValidate({
      content: '',
      bonusRate: ''
    });
    setStartDate(value);
  };
  const handleChangeEndDay = value => {
    setTextValidate({
      content: ''
    });
    setEndDate(value);
  };
  useEffect(() => {
    const nodeStart =
      startDateRef && startDateRef.current && startDateRef.current.input
        ? startDateRef.current.input
        : null;
    const nodeEnd =
      endDateRef && endDateRef.current && endDateRef.current.input
        ? endDateRef.current.input
        : null;
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', 'true');
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', 'true');
  }, []);
  const rules = {
    validFrom: ['required'],
    validTill: ['required'],
    bonusRate: ['required']
  };
  const handleSubmit = () => {
    let validation = {};
    const startDay = startDate
      ? moment(startDate).format('YYYY-MM-DD HH:mm:ss')
      : null;
    const endDay = endDate
      ? moment(endDate).format('YYYY-MM-DD HH:mm:ss')
      : null;
    const numberBonusRate = bonusRateRef.current
      ? bonusRateRef.current.value
      : null;
    const dataValidate = {
      validFrom: startDay,
      validTill: endDay,
      bonusRate: numberBonusRate
    };

    validation = validator(dataValidate, rules);

    if (endDate <= startDate) {
      setTextValidate({
        ...textValidate,
        content: ERROR_MESSAGE.VALIDATE_TIME_SEARCH
      });
      return;
    }
    if (!numberBonusRate) {
      setTextValidate({
        ...textValidate,
        bonusRate: ERROR_MESSAGE.REQUIRED
      });
      return;
    }
    if (Object.keys(validation).length > 0) {
      setTextValidate(validation);
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
      validFrom: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
      validTill: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
      bonusRate: Number(numberBonusRate),
      type: 'temporary'
    };
    handleModalSetting(dataSubmit);
  };
  return (
    <div className="w-100">
      <div className="date-setting">
        <p className="date-setting__title">시작/종료일 선택</p>
        <div className="range-date page-reserver">
          <div className="start-date">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <div>
              <DatePicker
                selected={startDate}
                onChange={date => handleChangeStartDay(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                startDate={startDate}
                endDate={endDate}
                locale="ko"
                dateFormat="yyyy-MM-dd h:mm:ss aa"
                disabledKeyboardNavigation
                timeFormat="HH:mm"
                showTimeSelect
                minDate={new Date()}
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={startDateRef}
                placeholderText="날짜를 선택해주세요."
              />
              {textValidate.validFrom && (
                <p className="error-msg mb-3 mt-1">{textValidate.validFrom}</p>
              )}
            </div>
          </div>
          <p className="icon">~</p>
          <div className="end-date">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <div>
              <DatePicker
                selected={endDate}
                onChange={date => handleChangeEndDay(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                endDate={endDate}
                minDate={startDate}
                locale="ko"
                showTimeSelect
                dateFormat="yyyy-MM-dd h:mm:ss aa"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={endDateRef}
                timeFormat="HH:mm"
                placeholderText="날짜를 선택해주세요."
              />
              {textValidate.validTill && (
                <p className="error-msg mb-3 mt-1">{textValidate.validTill}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {textValidate.content && (
        <p className="error-msg mb-3  mt-1">{textValidate.content}</p>
      )}
      <div className="setting-money">
        <p className="setting-money__title">이벤트 적립율 설정(0~100%)</p>
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

export default memo<Props>(MaintenanceHistory);
