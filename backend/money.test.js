const { rupeesToPaise } = require('./src/utils/money');

describe('rupeesToPaise', () => {
  test('converts "120.50" to 12050', () => {
    expect(rupeesToPaise("120.50")).toBe(12050);
  });

  test('converts "120" to 12000', () => {
    expect(rupeesToPaise("120")).toBe(12000);
  });

  test('invalid amount should fail', () => {
    expect(() => rupeesToPaise("invalid")).toThrow('Invalid amount format');
  });

  test('negative amount should fail', () => {
    expect(() => rupeesToPaise("-10")).toThrow('Invalid amount format');
  });
});