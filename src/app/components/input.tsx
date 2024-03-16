import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ classNames, ...inputProps }, ref) => {
    return (
      <input
        ref={ref}
        {...inputProps}
        className={clsx(
          classNames,
          'h-[40px] px-2 rounded-md border-solid border border-stone-200'
        )}
      />
    );
  }
);

InputComponent.displayName = 'Input';
