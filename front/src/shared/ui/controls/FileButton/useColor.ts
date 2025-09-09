export const UseColor = (name: string) => {
  const arr = name?.split('.');
  const format = arr[arr.length - 1].toLocaleLowerCase();

  switch (format) {
    case 'jpg':
      return '#00C650';
    case 'csv':
      return '#00C650';
    case 'raw':
      return '#FF3E4C';
    case 'zip':
      return '#FF3E4C';
    case 'pdf':
      return '#FF3E4C';
    case 'png':
      return '#005FAD';
    case 'crd':
      return '#00C650';
    case 'rar':
      return '#9747FF';
    case 'doc':
      return '#2869FE';
    case 'docx':
      return '#2869FE';
    case 'gif':
      return '#FF9908';
    case 'svg':
      return '#FF9908';
    case 'iso':
      return '#2869FE';
    case 'eps':
      return '#1D1929';
    case 'exe':
      return '#2869FE';
    case 'txt':
      return '#2869FE';
    case 'bmp':
      return '#9747FF';
    case 'xsl':
      return '#00C650';
    case 'xslx':
      return '#00C650';

    default:
      return '#1D1929';
  }
};
