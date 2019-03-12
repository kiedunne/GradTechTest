function createMenuData (data) {
  let splitstring = data.map(string => string.split('/'))

  let allParents = splitstring.map(string => string[0])
  let uniqueParents = [...new Set(allParents)].sort()

  let allChildren = splitstring.map(string => string[1])
  let definedChildren = allChildren.filter(element => typeof element === 'string')

  function makeHash (parent) {
    var hash = {}
    hash['title'] = parent
    hash['data'] = []
    definedChildren.forEach(function (child) {
      if (child.includes(parent)) {
        hash['data'].push(child)
      }
    })
    return hash
  }
  let finalArray = uniqueParents.map(makeHash).filter(pair => pair.data.length > 0)
  return finalArray
}

describe('menu Data Generator', () => {
  it('creates correct data structure ', () => {
    const data = [
      'parent1/parent1child',
      'parent1/parent1child2',
      'parent2/parent2child',
      'parent2/parent2child2',
      'parent1/parent1child3',
      'parent3',
      'parent3/parent3child1',
      'parent4'
    ]

    const expectedResult = [
      {
        title: 'parent1',
        data: ['parent1child', 'parent1child2', 'parent1child3']
      },
      { title: 'parent2', data: ['parent2child', 'parent2child2'] },
      { title: 'parent3', data: ['parent3child1'] }
    ]

    const actualResult = createMenuData(data)
    expect(actualResult).toMatchObject(expectedResult)
  })
})
