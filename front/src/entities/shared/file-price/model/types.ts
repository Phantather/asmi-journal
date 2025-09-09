export interface FilePriceItem {
  id_file: number;
  title: string;
  file_name: string;
}

export interface FilePrice extends Array<FilePriceItem> {}
