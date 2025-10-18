const { add, subtract, multiply, divide } = require('../src/math');

describe('math functions', () => {
  test('add: adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract: subtracts correctly', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply: multiplies correctly', () => {
    expect(multiply(3, 5)).toBe(15);
  });

  test('divide: divides correctly', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divide: throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  // extra test (>= 5 tests required)
  test('add: handles negatives', () => {
    expect(add(-2, 5)).toBe(3);
  });
});
