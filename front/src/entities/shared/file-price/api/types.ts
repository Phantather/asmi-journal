export interface ApiFilePrice {
  id_file: number;
  title: string;
  file_name: string;
}

export interface IFilePriceParams {
  id_vehicle: number;
}
export interface ApiFilePriceData {
  data: ApiFilePrice[];
}
