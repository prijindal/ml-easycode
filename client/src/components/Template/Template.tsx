import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as classnames from 'classnames';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
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
    // flex: 1,
  },
  base: {
    width: WIDTH,
  },
  card: {
    width: '100%'
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
  onSelected: (t: Template) => void;
};

interface TemplateComponentState {
  expanded: boolean
  ripple: boolean
}

class TemplateComponent extends React.Component<TemplateComponentProps & WithStyles<'root' | 'base' | 'card' | 'content' | 'contentOpen' | 'expand' | 'expandOpen'>, TemplateComponentState> {
  public static expandIconId = "expand-icon";
  public state = {
    expanded: false,
    ripple: true
  }

  public onSelected = () => {
    if(this.state.ripple) {
      this.props.onSelected(this.props.template);
    }
  }

  public handleExpandClick = (e:Event | any):void => 
    this.setState({ expanded: !this.state.expanded })

  public disableRipple = () =>
    this.setState({
      ripple: false
    })

  public enableRipple = () => 
    this.setState({
      ripple: true
    })

  public render() {
    const { classes, template } = this.props;
    return (
      <div className={classes.root}>
        <ButtonBase
          disableRipple={!this.state.ripple} 
          className={classes.base} 
          onClick={this.onSelected} 
          component="div"
        >
          <Card className={classes.card}>
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
              <Button disableRipple={true}>
                Choose Template
              </Button>
              {(template.about && template.about.length > 50) ?
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onMouseEnter={this.disableRipple}
                  onMouseLeave={this.enableRipple}
                  onClick={this.handleExpandClick}
                >
                  <ExpandMoreIcon id="expand-icon"/>
                </IconButton> : <IconButton disabled={true} />
              }
            </CardActions>
          </Card>
        </ButtonBase>
      </div>
    );
  }
}

export default decorate<TemplateComponentProps>(TemplateComponent);
