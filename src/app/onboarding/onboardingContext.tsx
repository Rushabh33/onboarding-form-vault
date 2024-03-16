'use client';
import { ReactNode, createContext, useState } from 'react';

export enum ONBOARDING_STEPS {
  STEP_1 = 1,
  STEP_2 = 2,
}

export const OnboardingContext = createContext({
  currentStep: ONBOARDING_STEPS.STEP_1,
  setCurrentStep: (step: ONBOARDING_STEPS) => {},
});

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<ONBOARDING_STEPS>(
    ONBOARDING_STEPS.STEP_1
  );

  return (
    <OnboardingContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}
