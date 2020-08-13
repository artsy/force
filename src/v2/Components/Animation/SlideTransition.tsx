import React from "react"
import { Transition } from "react-transition-group"

const duration = 250

export default props => {
  const defaultStyle = {
    transition: `height ${duration}ms ease-in-out`,
    height: "0px",
  }

  const transitionStyles = {
    entering: {
      height: "0px",
    },
    entered: {
      height: props.height,
    },
  }

  return (
    <Transition {...props}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {{ ...props.children }}
        </div>
      )}
    </Transition>
  )
}
