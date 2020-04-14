// @flow
/* eslint-disable react/no-find-dom-node */
// libs
import React, { memo, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/Button';
import Input from 'components/Input/InputChange';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ModalPrimary from '../Modal';
import { isNumberKey, isOnPasteNumber } from '../../constants/validate';
import ERROR_MESSAGE from '../../constants/errorMsg';

registerLocale('ko', ko);

type Props = {
  handleSubmitSearch: Function,
  handleSetting: Function,
  handleAccumulation: Function,
  reserveUse: Object
};

export const ReserveSearch = ({
  handleSubmitSearch,
  handleSetting,
  handleAccumulation,
  reserveUse
}: Props) => {
  const [validFrom, setValidFrom] = useState(null);
  const [validTill, setValidTill] = useState(null);
  const validFromRef = useRef(null);
  const validTillRef = useRef(null);
  const [popupValidate, setPopupValidate] = useState({
    isShow: false
  });
  const submitSearch = () => {
    const obSubmit = {
      validFrom: validFrom ? moment(validFrom).format('YYYY-MM-DD') : null,
      validTill: validTill ? moment(validTill).format('YYYY-MM-DD') : null,
      currentPage: 0
    };
    const startDay = moment(validFrom).format('YYYY-MM-DD');
    const endDay = moment(validTill).format('YYYY-MM-DD');
    if (Date.parse(endDay) <= Date.parse(startDay)) {
      setPopupValidate({
        ...popupValidate,
        isShow: true,
        content: ERROR_MESSAGE.VALIDATE_TIME_SEARCH
      });
      return;
    }

    handleSubmitSearch(obSubmit);
  };

  useEffect(() => {
    const nodeStart =
      validFromRef && validFromRef.current && validFromRef.current.input
        ? validFromRef.current.input
        : null;
    const nodeEnd =
      validTillRef && validTillRef.current && validTillRef.current.input
        ? validTillRef.current.input
        : null;
    ReactDOM.findDOMNode(nodeStart).setAttribute('readOnly', 'true');
    ReactDOM.findDOMNode(nodeEnd).setAttribute('readOnly', 'true');
  }, []);
  return (
    <div className="form-search search-reserve">
      <div className="form-search__left">
        <div className="form-search__date">
          <p className="form-search__title">시작일 조회</p>
          <div className="range-date">
            <div className="start-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={validFrom}
                onChange={date => setValidFrom(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                startDate={validFrom}
                endDate={validTill}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={validFromRef}
                isClearable
                placeholderText="날짜를 선택해주세요."
              />
            </div>
            <p className="icon">~</p>
            <div className="end-date">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <DatePicker
                selected={validTill}
                onChange={date => setValidTill(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                endDate={validTill}
                minDate={validFrom}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                disabledKeyboardNavigation
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                ref={validTillRef}
                isClearable
                placeholderText="날짜를 선택해주세요."
              />
            </div>
          </div>
          <div className="btn-search">
            <Button type="submit" variant="secondary " onClick={submitSearch}>
              확인
            </Button>
          </div>
        </div>

        <div className="form-search__reserve">
          <div className="wrap-reserve">
            <p className="form-search__title">현재 적립금</p>
            <div className="current-reserve">
              <div className="input-mt">
                <Input
                  placeholder="0"
                  type="text"
                  onKeyPress={e => isNumberKey(e)}
                  onPaste={e => isOnPasteNumber(e)}
                  inputMode="numeric"
                  onFocus={() => {}}
                  customClassName="text-center font-23"
                  pattern="[0-9]*"
                  readOnly
                  value={reserveUse && reserveUse.bonusRate}
                />
              </div>
              <p>%</p>
            </div>
          </div>
          <div className=" ml-0 ml-lg-3">
            <div className="range-day d-flex align-items-center mr-2">
              <p>
                {/* {reserveUse && reserveUse.type === 'temporary'
                  ? '수시'
                  : '상시'} */}
                *현재는 이벤트 적립금입니다
              </p>
            </div>
          </div>
        </div>
        <div className="form-search__reserve ">
          <p className="form-search__title">이벤트 적립기간</p>
          {reserveUse && reserveUse.type === 'temporary' ? (
            <div className="range-date-reserve">
              <p>
                {`시작일 : ${moment(reserveUse && reserveUse.validFrom).format(
                  'YYYY-MM-DD'
                )}`}
              </p>
              <p>
                {`종료일 : ${moment(reserveUse && reserveUse.validTill).format(
                  'YYYY-MM-DD'
                )}`}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="form-search__right right-reserve">
        <div className="ml-auto group-setting">
          <Button type="submit" variant="primary" onClick={handleSetting}>
            이벤트 적립율 설정
          </Button>
          <Button type="submit" variant="primary" onClick={handleAccumulation}>
            고정 적립율 설정
          </Button>
        </div>
      </div>
      <ModalPrimary
        title="알림"
        content={popupValidate.content}
        isOpen={popupValidate.isShow}
        handleClose={() => {
          setPopupValidate({
            isShow: false
          });
        }}
      />
    </div>
  );
};

export default memo<Props>(ReserveSearch);
