import React from 'react';
import Button from 'material-ui/Button';

class InputFileComponent extends React.PureComponent {
  render() {
    return (
      <Button size="small">
        <input
          type="file"
          id="trainfile"
          name="trainfile"
          onChange={this.props.handleFileInput}
        />
      </Button>
    );
  }
}

export default InputFileComponent;
