function createMenuData (data) {
  let parents = []
  let children = []

  let splitString = data.map(string => string.split('/'))

  splitString.forEach(function (element) {
    parents.push(element[0])
    parents = [...new Set(parents)].sort()
    if (element[1]) {
      children.push(element[1])
    }
  })

  var makeHash = (parent) => {
    var hash = {}
    hash.title = parent
    hash.data = []
    children.forEach(function (child) {
      if (child.includes(parent)) {
        hash.data.push(child)
      }
    })
    return hash
  }
  return parents.map(makeHash).filter(pair => pair.data.length > 0)
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
