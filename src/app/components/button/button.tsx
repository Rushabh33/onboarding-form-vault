import { ButtonHTMLAttributes } from 'react';
import { BUTTON_TYPES } from './constants';
import clsx from 'clsx';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  buttonType?: BUTTON_TYPES;
  classNames?: string;
}

export default function Button({
  buttonType = BUTTON_TYPES.PRIMARY,
  classNames,
  ...buttonAttributes
}: ButtonProps) {
  const buttonStyles = {
    'bg-black': buttonType === BUTTON_TYPES.PRIMARY,
    'bg-gray': buttonType === BUTTON_TYPES.SECONDARY,
  };

  return (
    <button
      className={clsx(
        'h-[40px] rounded-lg px-3 text-white text-xs',
        buttonStyles,
        classNames
      )}
      {...buttonAttributes}
    ></button>
  );
}
