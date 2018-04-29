/* @flow */
import injectSheet, { type JSSProps, type FunctionComponent } from 'react-jss';
import * as React from 'react';

import TemplateComponent from '../../components/Template';
import { type Template } from '../../models/template';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  additionaldiv: {
    flex: 1,
    display: 'inline-block',
    minWidth: 320,
  },
};

type TemplatesGridProps = {
  templates: Template[],
  onTemplateSelected: (t: Template) => void,
};

const TemplatesGrid = ({
  classes,
  templates,
  onTemplateSelected,
}: TemplatesGridProps & JSSProps<typeof styles>) => (
  <div className={classes.root}>
    {templates != null &&
      templates.map((i: Template) => (
        <TemplateComponent
          key={i.id}
          template={i}
          onSelected={onTemplateSelected}
        />
      ))}
    {templates != null &&
      templates.length > 2 && <div className={classes.additionaldiv} />}
  </div>
);

export default injectSheet(styles)(TemplatesGrid);
