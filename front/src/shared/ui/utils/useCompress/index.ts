import Compressor from 'compressorjs';

// compressorJs config for image
const STRICT = true;
const CHECKORIENTATION = false;
const MAXWIDTH = 500;
const MAXHEIGHT = 500;
const MINWIDTH = 0;
const MINHEIGHT = 0;
const WIDTH = undefined;
const HEIGHT = undefined;
const QUALITY = 0.8;
const MIMETYPE = '';
const CONVERTSIZE = 1000000;
// on file click
// const ANIMATION_DURATION_300MS = 300;

//all files max limit
const MAX_FILE_SIZE = 2000000; //2mb

export const useCompressFile = (file: any, succesHandle: any) => {
  //   console.log('input ', file);
  const options = {
    strict: STRICT,
    checkOrientation: CHECKORIENTATION,
    maxWidth: MAXWIDTH,
    maxHeight: MAXHEIGHT,
    minWidth: MINWIDTH,
    minHeight: MINHEIGHT,
    width: WIDTH,
    height: HEIGHT,
    quality: QUALITY,
    mimeType: MIMETYPE,
    convertSize: CONVERTSIZE,
    success: function (result: any) {
      if (result.size >= MAX_FILE_SIZE) {
        // eslint-disable-next-line no-alert
        alert(`Файл не должен превышать ${MAX_FILE_SIZE}`);
      }
      // one file if compressed size less

      return succesHandle(result); // one file if compressed size larger than self
    },
    error: function (err: any) {
      // eslint-disable-next-line no-alert
      alert(`Ошибка сжатия файла: ${err.message}`);
    },
  };

  // eslint-disable-next-line no-new
  new Compressor(file, options);
};
