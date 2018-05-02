/* @flow */

import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
} from 'material-ui';
import * as React from 'react';
import injectSheet, { type JSSProps } from 'react-jss';

import Loading from '../Loading';

import { type Parameters, type EnumType } from '../../models/parameters';

const styles = {
  root: {
    minWidth: 280,
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subheading: {
    marginTop: 20,
  },
  listitem: {
    paddingLeft: 8,
  },
};

export type InputParametersListProps = {
  data: {
    typeoftypes: EnumType,
    typeoflosses: EnumType,
    template: {
      parameters: Parameters,
    },
    loading: boolean,
  },
  setParameters: (paramaters: Parameters) => { type: string },
  parameters: Parameters,
  changeProperty: (
    parametername: string,
    parametervalue: string
  ) => { type: string },
};

class InputParametersList extends React.Component<
  InputParametersListProps & JSSProps<typeof styles>,
  void
> {
  componentWillMount() {
    this.props.setParameters(this.props.data.template.parameters);
  }

  render() {
    const { classes } = this.props;
    const { parameters } = this.props;
    if (parameters.loss == null) {
      return <Loading />;
    }
    const { typeoftypes, typeoflosses } = this.props.data;
    console.log(parameters);
    return (
      <div className={classes.root}>
        <Button variant="raised">Upload Code</Button>
        <FormLabel component="legend" className={classes.subheading}>
          Problem Type
        </FormLabel>
        <div className={classes.subheading}>
          <FormControl disabled={true}>
            <InputLabel>Method</InputLabel>
            <Select value="ann">
              <MenuItem value="ann">Artificial Neural Network</MenuItem>
            </Select>
          </FormControl>
        </div>
        <RadioGroup
          value={parameters.type}
          onChange={(event: Object) =>
            this.props.changeProperty('type', event.target.value)
          }
        >
          {typeoftypes.enumValues.map(typeoftype => (
            <FormControlLabel
              key={typeoftype.name}
              value={typeoftype.name}
              control={<Radio />}
              label={typeoftype.name}
            />
          ))}
        </RadioGroup>
        <TextField
          id="inputs"
          label="No. of inputs"
          placeholder="inputs"
          type="number"
          required
        />
        <div className={classes.subheading}>
          <FormControlLabel
            value="normalize"
            control={<Switch />}
            label="Normalize Input data"
          />
        </div>
        <FormLabel component="legend" className={classes.subheading}>
          Layers
        </FormLabel>
        <List>
          <ListItem button dense className={classes.listitem}>
            <ListItemText primary="Hidden, Dense, 4, Sigmoid" />
            <ListItemSecondaryAction>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Button variant="raised" size="small">
            Add Layer
          </Button>
          <ListItem button dense className={classes.listitem}>
            <ListItemText primary="Output, Dense, 2, Linear" />
            <ListItemSecondaryAction>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <TextField
          id="epochs"
          label="No. of epochs"
          placeholder="epochs"
          type="number"
        />
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Loss Function</InputLabel>
            <Select
              value={parameters.loss}
              onChange={(event: Object) =>
                this.props.changeProperty('loss', event.target.value)
              }
            >
              {typeoflosses.enumValues.map(typeoftype => (
                <MenuItem key={typeoftype.name} value={typeoftype.name}>
                  {typeoftype.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Optimizer</InputLabel>
            <Select value="sgd">
              <MenuItem value="sgd">Stochastic Gradient Descent</MenuItem>
              <MenuItem value="RMSprop">RMSProp</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Regularizer</InputLabel>
            <Select value="l1">
              <MenuItem value="l1">l1</MenuItem>
              <MenuItem value="l2">l2</MenuItem>
              <MenuItem value="l1_l2">l1_l2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Initializer</InputLabel>
            <Select value="glorot_uniform">
              <MenuItem value="glorot_uniform">Glorot Uniform</MenuItem>
              <MenuItem value="random_uniform">Random Uniform</MenuItem>
              <MenuItem value="zeroes">Zeros</MenuItem>
              <MenuItem value="ones">Ones</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(InputParametersList);
