import { ONBOARDING_INPUTS } from './constants';

export interface OnboardingFormValues {
  [ONBOARDING_INPUTS.firstName]: string;
  [ONBOARDING_INPUTS.lastName]: string;
  [ONBOARDING_INPUTS.phone]: string;
  [ONBOARDING_INPUTS.corporationNumber]: string;
}
