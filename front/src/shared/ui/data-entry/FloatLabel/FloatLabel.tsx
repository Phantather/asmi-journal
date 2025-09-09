import './index.css';

type FloatLabelProps = {
  label: string;
  required?: boolean;
  value: string;
  children?: React.ReactNode;
};

export const FloatInput = (props: FloatLabelProps) => {
  const { label, value, required } = props;

  const isOccupied = value && value.length !== 0;

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div className="float-label">
      {props.children}
      <label className={labelClass}>
        {label} {requiredMark}
      </label>
    </div>
  );
};
