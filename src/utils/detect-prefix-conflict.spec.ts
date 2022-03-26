import { detectPrefixConflict } from './detect-prefix-conflict';

describe('detectPrefixConflict', () => {
  test.each([
    ['Carol of the Bells', 'Glow Intro'],
    ['Color: Red', 'Color: Blue'],
    ['Color: Red', 'Color: Even: Red'],
    ['Color: Even: Red', 'Color: Red'],
    ['Color: Even: Red', 'Color: Even: Blue'],
  ])('%s should turn off %s', (a, b) => {
    expect(detectPrefixConflict(a, b)).toBeTruthy();
  });

  test.each([
    ['Color: Red', 'Color: Red'],
    ['Color: Red', 'Color:Red'],
    ['Color:Red', 'Color: Red'],
    ['color:red', 'COLOR:RED'],
    ['Color: Red', 'Position: Orb'],
    ['Position: Damascus', 'Color: Red'],
    ['Color: Even: Red', 'Color: Odd: Red'],
    ['Color: Even: Red', 'Color: Odd: Blue'],
  ])('%s should not turn off %s', (a, b) => {
    expect(detectPrefixConflict(a, b)).toBeFalsy();
  });
});
