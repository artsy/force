const React = require("react")

// This mock needs to be a class like the original implementation, otherwise we
// can’t have ref props on it.
class MockSlider extends React.Component {
  render() {
    return React.createElement("div", null, this.props.children)
  }
}

module.exports = MockSlider
