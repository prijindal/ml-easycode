import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { demoTemplates } from '../src/demodata/templates';
import TemplateComponent from '../src/components/Template/Template';
import TemplatesGrid from '../src/components/TemplatesGrid/TemplatesGrid';
import TemplatesScreen from '../src/screens/Templates';
import configureStore from '../src/store/configureStore';
import templates from '../src/store/templates';

const { store } = configureStore();

setTimeout(() => {
  store.dispatch(templates.success(demoTemplates));
}, 2000)

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
    <Provider store={store}>
      <TemplatesScreen />
    </Provider>
  ));
