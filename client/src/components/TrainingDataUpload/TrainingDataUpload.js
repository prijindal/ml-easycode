import React from 'react';
import { Button } from 'material-ui';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import * as Papa from 'papaparse';

import { type Parameters } from '../../models/parameters';

import injectSheet, { type JSSProps } from 'react-jss';

const styles = {};

export type TrainingDataUploadProps = {
  parameters: Parameters,
  setTrainFile: (file: File) => { type: String },
};

class TrainingDataUpload extends React.Component<
  TrainingDataUploadProps & JSSProps<typeof styles>,
  void
> {
  state = {
    open: false,
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

  handleFileInput = (e: Object) => {
    const { files } = e.target;
    if (files.length > 0) {
      let file = files[0];
      console.log(file);
      if (file.type === 'text/csv') {
        this.props.setTrainFile(file);
      } else {
        alert('Please upload a csv file');
      }
      // Papa.parse(file, {
      //   worker: false,
      //   complete: this.onFileReadComplete,
      //   error: console.log,
      // });
    }
  };

  render() {
    return (
      <div>
        <Dialog onClose={this.handleClose} open={this.state.open}>
          <DialogTitle>Upload Training Data</DialogTitle>
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
            <CardActions>
              <Button size="small">
                <input
                  type="file"
                  id="trainfile"
                  name="trainfile"
                  onChange={this.handleFileInput}
                />
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
