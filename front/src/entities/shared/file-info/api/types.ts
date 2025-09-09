export interface ApiFileInfo {
  id_file: number;
  file_name: string;
}

export interface IFileInfoParams {
  id_vehicle: number;
}
export interface ApiFileInfoData {
  data: ApiFileInfo[];
}
