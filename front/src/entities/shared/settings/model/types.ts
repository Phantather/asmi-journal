export type ISettingsType = 'manualVideo' | 'manualPdf' | 'manualPdf_rayono';

export interface SettingsItem {
  settings_name: ISettingsType;
  settings_value: string;
}

export interface SettingsList extends Array<SettingsItem> {}
