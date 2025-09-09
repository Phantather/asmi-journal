import { DatePicker as AntDatePicker, DatePickerProps } from 'antd';

export function DatePicker({ ...props }: DatePickerProps) {
  return <AntDatePicker {...props} size="large" />;
}
