import * as React from 'react';

// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import SearchBarComponent from '../src/components/SearchBar/SearchBar';

let s:string = "";
const ss = (a:string) => {s = a;return {type: ''}}; 

storiesOf('SearchBar', module)
  .add('SearchBarComponent', () => (
    <SearchBarComponent
      search={s}
      setSearch={ss}
    />
  ));
