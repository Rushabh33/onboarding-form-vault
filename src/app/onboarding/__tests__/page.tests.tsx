import {
  RenderResult,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import OnboardingForm from '../page';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { ReactElement } from 'react';
import { HttpResponse, http } from 'msw';

const handlers = [
  // Example GET request handler
  http.get(
    'https://front-end-home-task-api.onrender.com/corporation-number/:value',
    ({ params }) => {
      console.log('params: ', params);
      const { id } = params;
      console.log('Fetching user with ID "%s"', id);
    }
  ),
];

interface SetupResult extends RenderResult {
  user: UserEvent;
}

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

function setup(jsx: ReactElement): SetupResult {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('OnboardingForm', () => {
  describe('happy paths', () => {
    it('should render all required form inputs', () => {
      setup(<OnboardingForm />);

      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
      expect(screen.getByLabelText('Corporation Number')).toBeInTheDocument();
    });

    //This is there msw need to intercept and that's where I had to stop this challenge.
    // I'm new to setting up testing and need to better understand the MSW http method,
    // to figure out exactly how to ebst intercept the requests.
    it.skip('should submit a sucessful response if given the correct input', async () => {
      const { user } = setup(<OnboardingForm />);
      const firstNameInput = screen.getByLabelText('First Name');

      await user.type(firstNameInput, 'John');
      await waitFor(() => expect(firstNameInput).toHaveValue('John'));

      const lastNameInput = screen.getByLabelText('Last Name');
      const phoneInput = screen.getByLabelText('Phone Number');
      const corpNumInput = screen.getByLabelText('Corporation Number');

      await user.type(lastNameInput, 'Doe');
      await user.type(phoneInput, '6479917874');
      await user.type(corpNumInput, '123456789');

      await waitFor(() => expect(lastNameInput).toHaveValue('Doe'));
      await waitFor(() => expect(phoneInput).toHaveValue('6479917874'));
      await waitFor(() => expect(corpNumInput).toHaveValue('123456789'));

      await user.click(screen.getByRole('button', { name: 'Submit →' }));

      await waitFor(
        async () =>
          expect(
            await screen.findByText('Thanks for submitting!', { exact: false })
          ).toBeInTheDocument(),
        { timeout: 5000 }
      );
    });
  });

  describe('unhappy paths', () => {
    it('should ask the user to fill out all required fields', async () => {
      const { user } = setup(<OnboardingForm />);

      user.click(screen.getByRole('button'));

      expect(
        await screen.findAllByText('Please fill out all required fields')
      ).toHaveLength(4);
    });
  });
});
