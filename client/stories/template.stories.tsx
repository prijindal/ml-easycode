import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import TemplateComponent from '../src/components/Template/Template';
import TemplatesGrid from '../src/components/TemplatesGrid/TemplatesGrid';
import { Template } from '../src/models/template'; 
import TemplatesScreen from '../src/screens/Templates/Templates';
import templates from '../src/store/templates';

const demoTemplates: Template[] = [
  {
    id: '1',
    title: 'Image Processing',
    about: `Convoulutional Neural Network with 
            multiple hidden layers and classification
            output, also normalize the data.\n
            Good Starting point or MNIST`
  },
  {
    id: '2', 
    title: 'Speech Recognition',
    about: ''
  },
  {
    id: '3', 
    title: 'Engine Data',
    about: ''
  },
  {
    id: '4', 
    title: 'Engine Data',
    about: ''
  },
]

storiesOf('Templates', module)
  .add('TemplateComponent', () => (
    <TemplateComponent
      template={demoTemplates[0]}
      onSelected={action('clicked')}
    />
  ))
  .add('TemplatesGrid', () => (
    <TemplatesGrid
      templates={demoTemplates}
      onTemplateSelected={action('clicked')}
    />
  ))
  .add('TemplatesScreen', () => (
    <TemplatesScreen
      fetchTemplates={action(templates.start().type)}
      templates={demoTemplates}
      search=""
      isLoading={false}
    />
  ));
