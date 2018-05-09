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

import {
  type Parameters,
  type EnumType,
  type Layer,
} from '../../models/parameters';

import TrainingDataUpload from '../TrainingDataUpload';

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
    typeofinitializers: EnumType,
    typeofoptimizers: EnumType,
    typeofregularizers: EnumType,
    template: {
      sampleData: Object,
      parameters: Parameters,
    },
    loading: boolean,
  },
  setParameters: (paramaters: Parameters) => { type: string },
  parameters: Parameters,
  changeProperty: (
    parametername: string,
    parametervalue: any
  ) => { type: string },
};

class InputParametersList extends React.Component<
  InputParametersListProps & JSSProps<typeof styles>,
  void
> {
  componentWillMount() {
    this.props.setParameters(this.props.data.template.parameters);
  }

  layerString = (type: string, layer: Layer) =>
    `${type}, Dense, ${layer.nodes}, ${layer.activationFunction}`;

  render() {
    const { classes } = this.props;
    const { parameters } = this.props;
    if (parameters.loss == null) {
      return <Loading />;
    }
    const {
      typeoftypes,
      typeoflosses,
      typeofoptimizers,
      typeofinitializers,
      typeofregularizers,
    } = this.props.data;
    return (
      <div className={classes.root}>
        <TrainingDataUpload sampleData={this.props.data.template.sampleData} />
        <div className={classes.subheading}>
          <FormControl disabled={true}>
            <InputLabel>Method</InputLabel>
            <Select value="ann">
              <MenuItem value="ann">Artificial Neural Network</MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormLabel component="legend" className={classes.subheading}>
          Problem Type
        </FormLabel>
        <div className={classes.subheading}>
          <RadioGroup
            value={parameters.type}
            onChange={(event: Object) =>
              this.props.changeProperty('type', event.target.value)
            }
          >
            {typeoftypes != null &&
              typeoftypes.enumValues.map(typeoftype => (
                <FormControlLabel
                  key={typeoftype.name}
                  value={typeoftype.name}
                  control={<Radio />}
                  label={typeoftype.name}
                />
              ))}
          </RadioGroup>
        </div>
        <TextField
          id="inputs"
          label="No. of inputs"
          placeholder="inputs"
          type="number"
          value={parameters.inputlayer.nodes}
          onChange={(event: Object) =>
            this.props.changeProperty('inputlayer.nodes', event.target.value)
          }
          required
        />
        <div className={classes.subheading}>
          <FormControlLabel
            value="normalize"
            control={<Switch />}
            label="Normalize Input data"
            checked={parameters.shouldNormalize}
            onChange={(event: Object) =>
              this.props.changeProperty(
                'shouldNormalize',
                !parameters.shouldNormalize
              )
            }
          />
        </div>
        <FormLabel component="legend" className={classes.subheading}>
          Layers
        </FormLabel>
        <List>
          {parameters.hiddenlayers != null &&
            parameters.hiddenlayers.map(hiddenlayer => (
              <ListItem button dense className={classes.listitem}>
                <ListItemText primary="Hidden, Dense, 4, Sigmoid" />
                <ListItemSecondaryAction>
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          <Button variant="raised" size="small">
            Add Layer
          </Button>
          <ListItem button dense className={classes.listitem}>
            <ListItemText
              primary={this.layerString('Output', parameters.outputlayer)}
            />
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
          value={parameters.epochs}
          onChange={(event: Object) =>
            this.props.changeProperty('epochs', event.target.value)
          }
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
              {typeoflosses != null &&
                typeoflosses.enumValues.map(typeoftype => (
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
            <Select
              value={parameters.optimizer.function}
              onChange={(event: Object) =>
                this.props.changeProperty(
                  'optimizer.function',
                  event.target.value
                )
              }
            >
              {typeofoptimizers != null &&
                typeofoptimizers.enumValues.map(typeofoptimizer => (
                  <MenuItem
                    key={typeofoptimizer.name}
                    value={typeofoptimizer.name}
                  >
                    {typeofoptimizer.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Regularizer</InputLabel>
            <Select
              value={parameters.regularizer}
              onChange={(event: Object) =>
                this.props.changeProperty('regularizer', event.target.value)
              }
            >
              {typeofregularizers != null &&
                typeofregularizers.enumValues.map(typeofregularizer => (
                  <MenuItem
                    key={typeofregularizer.name}
                    value={typeofregularizer.name}
                  >
                    {typeofregularizer.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.subheading}>
          <FormControl>
            <InputLabel>Initializer</InputLabel>
            <Select
              value={parameters.initializer}
              onChange={(event: Object) =>
                this.props.changeProperty('initializer', event.target.value)
              }
            >
              {typeofinitializers != null &&
                typeofinitializers.enumValues.map(typeofinitializer => (
                  <MenuItem
                    key={typeofinitializer.name}
                    value={typeofinitializer.name}
                  >
                    {typeofinitializer.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(InputParametersList);
