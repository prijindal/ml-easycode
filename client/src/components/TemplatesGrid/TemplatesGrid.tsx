import { withStyles } from 'material-ui/styles';
import * as React from 'react';

import TemplateComponent, { TemplateComponentProps } from '../../components/Template';
import { Template } from '../../models/template';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'center',
  },
  additionaldiv: {
    flex: 1,
    display: 'inline-block',
    minWidth: 320,
  }
}));

interface TemplatesGridProps {
  templates: Template[];
  onTemplateSelected: TemplateComponentProps["onSelected"]
}


const TemplatesGrid = decorate<TemplatesGridProps>(({ classes, templates, onTemplateSelected }) => (
  <div className={classes.root}>
    {templates != null && templates.map(
      (i: Template) => (
        <TemplateComponent
          key={i.id}
          template={i}
          onSelected={onTemplateSelected}
        />
      )
    )}
    {templates != null && templates.length > 2 && 
      <div className={classes.additionaldiv}/>
    }
  </div>
));

export default TemplatesGrid;
