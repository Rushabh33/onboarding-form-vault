'use client';

import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/button/button';
import { ONBOARDING_INPUTS } from './constants';
import { OnboardingFormValues } from './types';
import { FormInput } from '../components/form-input/formInput';
import { CONTENT_POS } from '../components/form-input/constants';
import { ONBOARDING_STEPS, OnboardingContext } from './onboardingContext';

export default function OnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<OnboardingFormValues>({
    mode: 'onBlur',
  });
  const { setCurrentStep } = useContext(OnboardingContext);

  const onSubmit: SubmitHandler<OnboardingFormValues> = async (data) => {
    // Prefix phone number with +1
    data.phone = '+1' + data.phone;

    try {
      const response = await fetch(
        'https://front-end-home-task-api.onrender.com/profile-details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      setCurrentStep(ONBOARDING_STEPS.STEP_2);
      reset();
    } catch (error) {
      throw new Error(`Error with response: ${error}`);
    }
  };

  const validatePhoneNumber = (value: string) => {
    const canadianPhoneNumberRegex = /^[2-9]\d{2}[2-9](?!11)\d{6}$/;
    if (!value) {
      return 'Please fill out all required fields';
    }
    if (!canadianPhoneNumberRegex.test(`${value}`)) {
      return 'Please enter a valid Canadian phone number';
    }
    return true;
  };

  const corporationNumber = async (value: string) => {
    try {
      const response = await fetch(
        `https://front-end-home-task-api.onrender.com/corporation-number/${value}`
      );
      const data = await response.json();

      if (!data.valid) {
        return data.message;
      }
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorObj = error as Error;
      return `Failed to validate corporation number: ${errorObj.message}`;
    }
  };

  return (
    <div className='w-3/4 p-6 rounded-3xl bg-white  border-solid border border-stone-200 md:w-1/2'>
      {!isSubmitSuccessful ? (
        <>
          <h1 className='mb-5 text-lg text-center md:text-2xl'>
            Onboarding Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-between flex-col md:mb-5 md:flex-row md:gap-8'>
              <FormInput
                title='First Name'
                id={ONBOARDING_INPUTS.firstName}
                errors={errors}
                isRequired={true}
                {...register(ONBOARDING_INPUTS.firstName, {
                  required: 'Please fill out all required fields',
                  minLength: {
                    value: 2,
                    message: 'Must be 2 characters or more.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Must be 50 characters or less.',
                  },
                })}
                classNames='h-[100px] mb-3 sm:mb-0 md:w-1/2 md:h-[110px]'
              />
              <FormInput
                title='Last Name'
                id={ONBOARDING_INPUTS.lastName}
                errors={errors}
                isRequired={true}
                {...register(ONBOARDING_INPUTS.lastName, {
                  required: 'Please fill out all required fields',
                  minLength: {
                    value: 2,
                    message: 'Minimum of 2 characters required',
                  },
                  maxLength: { value: 50, message: 'Maximum 50 characters' },
                })}
                classNames='h-[100px] mb-3 sm:mb-0 md:w-1/2 md:h-[110px]'
              />
            </div>
            <FormInput
              classNames='h-[100px] mb-7 sm:mb-0 md:h-[110px]'
              title='Phone Number'
              id={ONBOARDING_INPUTS.phone}
              errors={errors}
              isRequired={true}
              {...register(ONBOARDING_INPUTS.phone, {
                required: 'Please fill out all required fields',
                validate: validatePhoneNumber,
              })}
              inputContent={
                <span className='absolute bottom-[7.5px] left-3'>+1</span>
              }
              contentPosition={CONTENT_POS.START}
            />
            <FormInput
              classNames='h-[100px] mb-10 sm:mb-0 md:h-[110px]'
              title='Corporation Number'
              id={ONBOARDING_INPUTS.corporationNumber}
              errors={errors}
              isRequired={true}
              {...register(ONBOARDING_INPUTS.corporationNumber, {
                required: 'Please fill out all required fields',
                validate: corporationNumber,
              })}
            />
            <Button classNames='w-full'>
              {isValidating
                ? 'Loading...'
                : isSubmitting
                ? 'Submitting response...'
                : 'Submit →'}
            </Button>
          </form>
        </>
      ) : (
        <div className='text-center'>Thanks for submitting!</div>
      )}
    </div>
  );
}
