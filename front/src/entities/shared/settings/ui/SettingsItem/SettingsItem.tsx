import { FC } from 'react';

import { SettingsItem } from '../../model';

export interface SettingsItemViewProps {
  settings: SettingsItem;
}

export const SettingsItemViewP: FC<SettingsItemViewProps> = ({ settings }) => {
  return (
    <div>
      <div>{settings.settings_name}</div>
      <div>{settings.settings_value}</div>
    </div>
  );
};
