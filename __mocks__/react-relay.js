let React = require.requireActual("react")

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
  graphql,
  commitMutation: jest.fn(),
  QueryRenderer: props => React.createElement("div", {}),
  createFragmentContainer: component => component,
  createPaginationContainer: component => component,
  createRefetchContainer: component => component,
}
