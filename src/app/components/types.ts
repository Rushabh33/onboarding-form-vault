import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  title: string;
};
