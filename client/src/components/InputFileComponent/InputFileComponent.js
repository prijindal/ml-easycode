/* @flow */

import React from 'react';
import injectSheet, { type JSSProps } from 'react-jss';

const styles = {
  root: {
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '8px 16px',
    minWidth: 88,
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    minHeight: '36px',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.4em',
    fontGamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    borderRadius: '2px',
    textTransform: 'uppercase',
  },
};

type InputFileComponentProps = {
  id: string,
  handleFileInput: (e: Object) => void,
};

class InputFileComponent extends React.PureComponent<
  InputFileComponentProps & JSSProps<typeof styles>
> {
  onButtonClick = () => {
    console.log(this.refs);
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <input
          type="file"
          id={this.props.id}
          name={this.props.id}
          ref="file-input"
          onChange={this.props.handleFileInput}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(InputFileComponent);
