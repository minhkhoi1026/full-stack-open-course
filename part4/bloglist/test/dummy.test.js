const dummy = require('../utils/list_helper').dummy

test('dummy returns one', () => {
  const result = dummy([])
  expect(result).toBe(1)
})