const React = require("react")

// This mock needs to be a class like the original implementation, otherwise we
// can’t have ref props on it.
class MockSlider extends React.Component {
  render() {
    const { children, customPaging } = this.props

    return (
      <div>
        {children}
        {customPaging && (
          <div>
            {children.map((_child, index) => {
              return <div key={index}>{customPaging()}</div>
            })}
          </div>
        )}
      </div>
    )
  }
}

module.exports = MockSlider
