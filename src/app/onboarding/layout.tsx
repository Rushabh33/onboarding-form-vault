import { ReactNode } from 'react';
import StepCounter from './stepCounter';
import { OnboardingProvider } from './onboardingContext';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='h-screen w-screen pt-12 px-6 flex flex-col items-center gap-28'>
      <OnboardingProvider>
        <StepCounter />
        {children}
      </OnboardingProvider>
    </div>
  );
}
