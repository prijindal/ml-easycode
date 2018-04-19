import { withStyles } from 'material-ui/styles';
import * as React from 'react';

import TemplateComponent, { TemplateComponentProps } from '../../components/Template';
import { Template } from '../../models/template';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'flex-start',
    maxWidth: 960,
    margin: '0 auto',
  },
}));

interface TemplatesGridProps {
  templates: Template[];
  onTemplateSelected: TemplateComponentProps["onSelected"]
}


const TemplatesGrid = decorate<TemplatesGridProps>(({ classes, templates, onTemplateSelected }) => (
  <div className={classes.root}>
    {templates.map(
      (i: Template) => (
        <TemplateComponent
          key={i.id}
          template={i}
          onSelected={onTemplateSelected}
        />
      )
    )}
  </div>
));

export default TemplatesGrid;
