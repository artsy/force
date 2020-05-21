import React, { Component } from "react"

export class IconLock extends Component<any> {
  static defaultProps = {
    color: "black",
    width: "15px",
    height: "15px",
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 8 11"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="none"
          strokeWidth="1"
          fill={this.props.color}
          fillRule="evenodd"
          transform="translate(-1008.000000, -224.000000)"
        >
          <g
            transform="translate(987.000000, 209.000000)"
            fill={this.props.color}
          >
            <g transform="translate(21.000000, 14.500000)">
              <g transform="translate(0.000000, 1.000000)">
                <path d="M1.03703704,2.98507463 C1.03703704,1.33646343 2.36360074,0 4,0 C5.63639926,0 6.96296296,1.33646343 6.96296296,2.98507463 L6.96296296,4.02985075 L8,4.02985075 L8,10 L0,10 L0,4.02985075 L1.03703704,4.02985075 L1.03703704,2.98507463 Z M2.07407407,2.98507463 L2.07407407,4.02985075 L5.92592593,4.02985075 L5.92592593,2.98507463 C5.92592593,1.91347735 5.06365952,1.04477612 4,1.04477612 C2.93634048,1.04477612 2.07407407,1.91347735 2.07407407,2.98507463 Z" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}
