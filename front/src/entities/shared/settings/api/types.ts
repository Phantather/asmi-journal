export type ISettingsType = 'MES_FORM_TEXT';

export interface ISettings {
  settings_name: ISettingsType;
  settings_value: string;
}
export interface ApiSettingsData {
  data?: ISettings[];
  error?: boolean;
}
