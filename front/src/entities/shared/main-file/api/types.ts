export interface ApiMainFile {
  id_guide_files: number;
  id_vehicle: number;
  vehicle_name: string;
  id_guide: number;
  file_name: string;
  image: any;
}

export interface ApiMainFileData {
  result: ApiMainFile[];
}
