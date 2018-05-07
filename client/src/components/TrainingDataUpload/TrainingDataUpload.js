import React from 'react';
import { Button } from 'material-ui';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import * as Papa from 'papaparse';

import { type Parameters } from '../../models/parameters';
import InputFileComponent from '../InputFileComponent';

import injectSheet, { type JSSProps } from 'react-jss';

const styles = {
  actions: {
    flexWrap: 'wrap',
  },
};

export type TrainingDataUploadProps = {
  parameters: Parameters,
  setTrainFile: (file: File) => { type: String },
  sampleData: Object,
};

class TrainingDataUpload extends React.Component<
  TrainingDataUploadProps & JSSProps<typeof styles>,
  void
> {
  state = {
    open: false,
    file: null,
  };

  openDialog = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  onFileReadComplete = e => {
    console.log(e);
  };

  handleFileInput = (e: Object): boolean => {
    const { files } = e.target;
    if (files.length > 0) {
      let file = files[0];
      console.log(file);
      if (file.type === 'text/csv') {
        this.setState({
          file,
        });
        return true;
      } else {
        e.target.files = undefined;
        e.target.value = '';
        alert('Please upload a csv file');
        return false;
      }
      // Papa.parse(file, {
      //   worker: false,
      //   complete: this.onFileReadComplete,
      //   error: console.log,
      // });
    } else {
      return false;
    }
  };

  onConfirm = () => {
    this.props.setTrainFile(this.state.file);
    this.setState({
      file: null,
    });
    this.handleClose();
  };

  onCancel = () => {
    this.setState({
      file: null,
    });
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog onClose={this.handleClose} open={this.state.open}>
          <DialogTitle>Select Training Data</DialogTitle>
          <Card>
            <CardContent>
              <Typography variant="title" component="h2">
                Input Data
              </Typography>
              <Typography color="textSecondary">
                You can upload a csv file here.{'\n'}
                Make sure that there are{' '}
                {this.props.parameters.inputlayer.nodes +
                  this.props.parameters.outputlayer.nodes}{' '}
                columns
              </Typography>
            </CardContent>
            <CardActions className={this.props.classes.actions}>
              <InputFileComponent
                id="trainfile"
                handleFileInput={this.handleFileInput}
              />
              {this.props.sampleData != null && <Button>Use Demo Data</Button>}
            </CardActions>
            <CardActions className={this.props.classes.actions}>
              <Button onClick={this.onCancel}>Cancel</Button>
              <Button
                onClick={this.onConfirm}
                disabled={this.state.file == null}
              >
                Confirm
              </Button>
            </CardActions>
          </Card>
        </Dialog>
        <Button onClick={this.openDialog} variant="raised">
          Upload Training Data
        </Button>
      </div>
    );
  }
}

export default injectSheet(styles)(TrainingDataUpload);