/* @flow */
import reducer from './index';

it('check initial state', () => {
  expect(reducer()).toBe('');
});

it('should check changed state', () => {
  expect(reducer('', { type: 'SET_SEARCH', search: 'Some Search' })).toBe(
    'Some Search'
  );
});

it('should reset search state', () => {
  expect(reducer('Some search', { type: 'RESET_SEARCH' })).toBe('');
});
