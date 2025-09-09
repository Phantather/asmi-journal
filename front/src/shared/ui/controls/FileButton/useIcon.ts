import {
  FileDefaultIcon,
  bmpIcon,
  crdIcon,
  csvIcon,
  docIcon,
  docxIcon,
  epsIcon,
  exeIcon,
  gifIcon,
  isoIcon,
  jpgIcon,
  pdfIcon,
  pngIcon,
  rarIcon,
  rawIcon,
  svgIcon,
  txtIcon,
  xslIcon,
  zipIcon,
} from '~shared/ui/Icons';

export const UseIcon = (name: string) => {
  const arr = name?.split('.');
  const format = arr[arr.length - 1].toLocaleLowerCase();

  switch (format) {
    case 'jpg':
      return jpgIcon();
    case 'csv':
      return csvIcon();
    case 'raw':
      return rawIcon();
    case 'zip':
      return zipIcon();
    case 'pdf':
      return pdfIcon();
    case 'png':
      return pngIcon();
    case 'crd':
      return crdIcon();
    case 'rar':
      return rarIcon();
    case 'doc':
      return docIcon();
    case 'docx':
      return docxIcon();
    case 'gif':
      return gifIcon();
    case 'svg':
      return svgIcon();
    case 'iso':
      return isoIcon();
    case 'eps':
      return epsIcon();
    case 'exe':
      return exeIcon();
    case 'txt':
      return txtIcon();
    case 'bmp':
      return bmpIcon();
    case 'xsl':
      return xslIcon();
    case 'xslx':
      return xslIcon();

    default:
      return FileDefaultIcon();
  }
};
