import * as React from 'react';

import { storiesOf } from '@storybook/react';

import TemplateComponent from '../src/components/template';

storiesOf('TemplateComponent', module)
  .add('default', () => <TemplateComponent />);
