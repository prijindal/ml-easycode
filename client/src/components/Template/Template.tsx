import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as classnames from 'classnames';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as React from 'react';

import { Template } from '../../models/template'; 

const TOTAL_SIZE = 960;
const NUMBER = 3;
const PADDING = 5;
const PER_ELEMENT = TOTAL_SIZE/NUMBER;
const WIDTH = PER_ELEMENT - 2 * PADDING;
const HEIGHT = 30;

const decorate = withStyles((theme) => ({
  root: {
    padding: PADDING,
    display: 'inline-block',
  },
  card: {
    width: WIDTH,
  },
  content: {
    height: HEIGHT,
    overflow: 'hidden' as 'hidden',
  },
  contentOpen: {
    height: 'initial'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

export interface TemplateComponentProps {
  template: Template;
  onSelected: () => void;
};

interface TemplateComponentState {
  expanded: boolean
}

class TemplateComponent extends React.PureComponent<TemplateComponentProps & WithStyles<'root' | 'card' | 'content' | 'contentOpen' | 'expand' | 'expandOpen'>, TemplateComponentState> {
  public state = {
    expanded: false
  }

  public handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  public render() {
    const { classes, template, onSelected } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card} onClick={onSelected}>
          <CardContent
            className={classnames(classes.content, {
              [classes.contentOpen]: this.state.expanded
            })}
          >
            <Typography variant="title" gutterBottom={true}>
              {template.title}
            </Typography>
            <Typography variant="body1">
              {template.about}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>
              Choose Template
            </Button>
            {(template.about && template.about.length > 50) ?
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
              >
                <ExpandMoreIcon />
              </IconButton> : <IconButton disabled={true} />
            }
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default decorate<TemplateComponentProps>(TemplateComponent);
