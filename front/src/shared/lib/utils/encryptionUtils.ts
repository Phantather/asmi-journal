import CryptoJS from 'crypto-js';

const initVector = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPTION_VECTOR || '');
const securityKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPTION_KEY || '');
const algorithm = 'AES-128-CBC';

export const encryptData = (text?: string): string => {
  if (!text) {
    return '';
  }

  const cipherText = CryptoJS.AES.encrypt(text, securityKey, {
    iv: initVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return cipherText;
};

export const decryptData = (cipherText?: string): string => {
  if (!cipherText) {
    return '';
  }

  const decryptedText = CryptoJS.AES.decrypt(cipherText, securityKey, {
    iv: initVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);

  return decryptedText;
};
