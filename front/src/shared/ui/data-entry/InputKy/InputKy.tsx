import { Input, InputProps } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React, { FC, useEffect, useState } from 'react';

import { Button } from '~shared/ui';

interface InputKyProps extends InputProps {
  name?: string;
  required?: any;
  placeholder: string;
  size?: SizeType;
  className?: string;
  value?: any;
  displayButtons?: boolean;
  onChange?: (value: string | any) => any;
}

export const InputKy: FC<InputKyProps> = ({
  name,
  placeholder = '',
  size = 'large',
  required,
  value,
  displayButtons = true,
  onChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(true);
    }

    if (event.key === 'CapsLock') {
      const capsLockOn = event.getModifierState && event.getModifierState('CapsLock');
      setIsShiftPressed(capsLockOn);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

  const handleClick = (button: string) => {
    const newChar = isShiftPressed ? button.toUpperCase() : button.toLowerCase();
    const updatedValue = internalValue + newChar;
    setInternalValue(updatedValue);
    onChange && onChange(updatedValue);
  };

  const buttons = ['Ө', 'Ү', 'Ң'];

  useEffect(() => {
    const handleWindowKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('keyup', handleWindowKeyUp);

    return () => window.removeEventListener('keyup', handleWindowKeyUp);
  }, []);

  return (
    <Input
      placeholder={placeholder}
      required={required}
      value={internalValue}
      name={name}
      onChange={handleChange}
      size={size}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      suffix={
        displayButtons ? (
          <span className="flex gap-1">
            {buttons.map((button: string) => (
              <Button
                className="p-[10px] bg-[#f0f0f0] hover:!bg-[#dedede] hover:!text-black h-[18px] w-[18px] flex items-center justify-center border-none focus:outline-none"
                key={button}
                value={button}
                onClick={() => handleClick(button)}
              >
                <span className="text-[12px]">
                  {isShiftPressed ? button.toUpperCase() : button.toLowerCase()}
                </span>
              </Button>
            ))}
          </span>
        ) : null
      }
      {...props}
    />
  );
};
