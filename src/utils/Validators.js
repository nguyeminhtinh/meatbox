/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
// @flow
import REGEX from 'constants/regex';
import ERROR_MESSAGE from 'constants/errorMsg';

// eslint-disable-next-line import/prefer-default-export
export const validator = (objectVal: Object, validate: Object) => {
  const error = {};

  const keys = Object.keys(objectVal);

  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    const rules = validate[key];
    const value = objectVal[key];
    let errorMsg = '';

    for (let j = 0; j < rules.length; j += 1) {
      switch (rules[j]) {
        case 'required':
          if (value === '' || value === null || value === undefined) {
            errorMsg = ERROR_MESSAGE.REQUIRED;
          }

          break;
        case 'productCode':
          if (!REGEX.NUMBER.test(value)) {
            errorMsg = ERROR_MESSAGE.NUMBER;
          }
          break;
        case 'phoneNumber':
          if (!REGEX.PHONE_NUMBER.test(value)) {
            errorMsg = ERROR_MESSAGE.PHONE_NUMBER;
          }
          break;
        case 'email':
          if (!REGEX.EMAIL.test(value)) {
            errorMsg = ERROR_MESSAGE.EMAIL;
          }
          break;
        case 'userId':
          if (!REGEX.USER_NAME.test(value)) {
            errorMsg = ERROR_MESSAGE.USER_NAME;
          }
          break;
        case 'password':
          if (!REGEX.PASSWORD.test(value)) {
            errorMsg = ERROR_MESSAGE.PASSWORD;
          }
          break;
        case 'deviceType':
          if (!REGEX.DEVICE_TYPE.test(value)) {
            errorMsg = ERROR_MESSAGE.MODEL_DEVICE;
          }
          break;
        case 'deviceTime':
          if (!REGEX.DEVICE_TIME.test(value)) {
            errorMsg = ERROR_MESSAGE.MODEL_DEVICE;
          }
          break;
        case 'deviceOrder':
          if (!REGEX.DEVICE_TIME.test(value)) {
            errorMsg = ERROR_MESSAGE.MODEL_DEVICE;
          }
          break;
        case 'validatePass':
          if (value) {
            if (!REGEX.VALIDATE_PASSWORD.test(value)) {
              errorMsg = ERROR_MESSAGE.TEXT_VALIDATE_PASSWORD;
            }
          }

          break;
        default:
          break;
      }
      if (errorMsg) {
        error[key] = errorMsg;
      }
    }
  }
  return error;
};

export const formatValue = (mask: string, value: any) => {
  // eslint-disable-next-line one-var
  const s = '' + value;
  let r = '';
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask[im] === 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
};
