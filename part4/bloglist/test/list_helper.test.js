const listHelper =  require('../utils/list_helper')
const sample = require('./test_sample')

// test dummy function
test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

// test favoriteBlog function
describe('favorite blog', () => {
  test('when list has only one blog, equals that only blog', () => {
    const expected_result = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.favoriteBlog(sample.listWithOneBlog)
    expect(result).toEqual(expected_result)
  })

  test("of a bigger blog list is calculated right", () => {
    const expected_result = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
    const result = listHelper.favoriteBlog(sample.listWithMultiBlog)
    expect(result).toEqual(expected_result)
  })

  test("of a empty list is empty object", () => {
    const expected_result = {}
    const result = listHelper.favoriteBlog(sample.emptyList)
    expect(result).toEqual(expected_result)
  })
})

// test totalLikes function
describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(sample.listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger blog list is calculated right", () => {
    expect(listHelper.totalLikes(sample.listWithMultiBlog)).toBe(7 + 5 + 10 + 12 + 2)
  })

  test("of a empty list is zero", () => {
    expect(listHelper.totalLikes(sample.emptyList)).toBe(0)
  })
})