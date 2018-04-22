import * as React from 'react';

// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import StepperBarComponent from '../src/components/StepperBar/StepperBar';

storiesOf('StepperBar', module)
  .add('StepperBarComponent', () => (
    <StepperBarComponent />
  ));
