import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputComponent } from '../input';
import { CONTENT_POS } from './constants';

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  title: string;
  id: string;
  // maybe turn this into a fieldValue isntead
  errors: FieldErrors;
  isRequired: boolean;
  inputContent?: ReactNode;
  contentPosition?: CONTENT_POS;
  inputClassNames?: string;
  classNames?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      title,
      id,
      errors,
      classNames,
      type,
      isRequired,
      contentPosition,
      inputContent,
      ...inputProps
    },
    ref
  ) => {
    const isError = !!errors[id];

    const errorMessage = errors[id]?.message as string;

    return (
      <div className={clsx(classNames, ' flex flex-col gap-1')}>
        <div className='flex gap-1'>
          <label htmlFor={id}>{title}</label>
          {isRequired && <span className='text-red-500 inline blue'>*</span>}
        </div>
        <div
          className={clsx('flex', {
            'flex-row-reverse': contentPosition === CONTENT_POS.END,
            'flex-row': contentPosition === CONTENT_POS.START,
            relative: inputContent,
          })}
        >
          {inputContent}
          <InputComponent
            ref={ref}
            {...inputProps}
            type={type || 'text'}
            id={id}
            classNames={clsx(
              'w-full h-[40px] rounded-md border-solid border border-stone-200',
              {
                'px-2': !contentPosition,
                'pl-2 pr-8': contentPosition === CONTENT_POS.END,
                'pl-8 pr-2': contentPosition === CONTENT_POS.START,
              }
            )}
          />
        </div>
        {isError && (
          <span className='text-sm text-red-500'>{errorMessage}</span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
