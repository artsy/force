let React = jest.requireActual("react")

// This is a template string function, which returns the original string
// It's based on https://github.com/lleaff/tagged-template-noop
// Which is MIT licensed to lleaff
const graphql = (strings, ...keys) => {
  const lastIndex = strings.length - 1
  return (
    strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], "") +
    strings[lastIndex]
  )
}

module.exports = {
  QueryRenderer: props => React.createElement("div", {}),
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
  createPaginationContainer: component => component,
  createRefetchContainer: component => component,
  fetchQuery: jest.fn(),
  graphql,
}
