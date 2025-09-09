export const fileSave = (blob: Blob, filename: string): void => {
  const url: string = window.URL.createObjectURL(blob);

  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
