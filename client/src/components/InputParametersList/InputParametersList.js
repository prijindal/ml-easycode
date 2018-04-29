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

export type InputParametersListProps = {};

class InputParametersList extends React.PureComponent<
  InputParametersListProps & JSSProps<typeof styles>,
  null
> {
  render() {
    const { classes } = this.props;
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
        <RadioGroup aria-label="gender" name="gender1">
          <FormControlLabel
            value="classification"
            control={<Radio />}
            label="Classification"
          />
          <FormControlLabel
            value="regression"
            control={<Radio />}
            label="Regression"
          />
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
            <Select value="msa">
              <MenuItem value="crossentropy">Cross Entropy</MenuItem>
              <MenuItem value="msa">Mean Squared Error</MenuItem>
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
