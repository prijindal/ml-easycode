/* @flow */
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles(theme => ({
  root: {
    marginBottom: 40,
  },
}));

type SampleTestInputsProps = {
  showTestCases: boolean,
  testinputs: number[][],
  values: number[],
  classes: decorate.classes,
  toggleTestCases: () => void,
  testX: any,
  testY: any,
};

const SampleTestInputs = ({
  toggleTestCases,
  showTestCases,
  testX,
  testY,
  values,
  classes,
}: SampleTestInputsProps) => (
  <div className={classes.root}>
    <Button onClick={toggleTestCases}>
      {showTestCases ? 'Hide Test Cases' : 'Show Test Cases'}
    </Button>
    {showTestCases ? (
      <table className="mui-table">
        <thead>
          <tr>
            <td>Test inputs</td>
            <td>Actual Value</td>
            <td>Test Predictions</td>
          </tr>
        </thead>
        <tbody>
          {testX.map((testinput: number[], index: number) => (
            <tr key={index}>
              <td>{testinput.map(value => `${value}, `)}</td>
              <td>{testY[index]}</td>
              <td>{values[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div />
    )}
  </div>
);

export default decorate(SampleTestInputs);
