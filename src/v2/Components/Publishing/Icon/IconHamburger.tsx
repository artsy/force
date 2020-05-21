import React, { Component } from "react"

export class IconHamburger extends Component<any, null> {
  static defaultProps = {
    color: "black",
    onClick: x => x,
  }

  render() {
    return (
      <svg
        onClick={this.props.onClick}
        fill={this.props.color}
        width="32px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        enableBackground="new 0 0 32 32"
      >
        <rect x="6" y="22" width="20" height="2" />
        <rect x="6" y="15" width="20" height="2" />
        <rect x="6" y="8" width="20" height="2" />
      </svg>
    )
  }
}
