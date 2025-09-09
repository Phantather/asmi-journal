export const checkPins = (value: any) => {
  let input = value.replace(!/[^0-9.]/g, '');

  input = String(input?.slice(0, 14).trim());
  const arrInput = input.split('');

  if (arrInput.length === 0) {
    return;
  }

  if (arrInput[0] !== '1' && arrInput[0] !== '2') {
    return `1${input?.slice(1, 14)}`; // Y-xx-xx-xxxx-xxxxx
  }

  if (arrInput.length === 2 && ['0', '1', '2', '3']?.indexOf(arrInput[1]) === -1) {
    return `${input?.slice(0, 1)}0${input?.slice(2, 14)}`; // x-Yx-xx-xxxx-xxxxx
  }

  if (arrInput.length === 3 && ['3']?.indexOf(arrInput[1]) === 0) {
    if (['0', '1']?.indexOf(arrInput[1]) === -1) {
      return `${input?.slice(0, 2)}1${input?.slice(3, 14)}`; // x-xY-xx-xxxx-xxxxx
    }
  }

  if (arrInput.length === 4 && ['0', '1']?.indexOf(arrInput[3]) === -1) {
    return `${input?.slice(0, 3)}0${input?.slice(4, 14)}`; // x-xx-Yx-xxxx-xxxxx
  }

  if (arrInput.length === 5 && arrInput[3] === '1') {
    if (['0', '1', '2']?.indexOf(arrInput[4]) === -1) {
      return `${input?.slice(0, 4)}2${input?.slice(6, 14)}`; // x-xx-xY-xxxx-xxxxx
    }
  }

  if (arrInput.length === 6 && ['1', '2']?.indexOf(arrInput[5]) === -1) {
    return `${input?.slice(0, 5)}2${input?.slice(6, 14)}`; // x-xx-xx-Yxxx-xxxxx
  }

  if (arrInput.length === 7 && ['9', '0']?.indexOf(arrInput[6]) === -1) {
    return `${input?.slice(0, 6)}0${input?.slice(7, 14)}`; // x-xx-xx-xYxx-xxxxx
  }

  return input;
};
