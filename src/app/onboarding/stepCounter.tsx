'use client';
import { useContext } from 'react';
import { ONBOARDING_STEPS, OnboardingContext } from './onboardingContext';

export default function StepCounter() {
  const { currentStep } = useContext(OnboardingContext);
  const numOfSteps = Object.values(ONBOARDING_STEPS).length / 2;

  return (
    <div>
      Step {currentStep} of {numOfSteps}
    </div>
  );
}
