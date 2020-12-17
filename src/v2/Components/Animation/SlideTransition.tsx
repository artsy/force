import React from "react"
import { Transition } from "react-transition-group"

const duration = 250

export default props => {
  const defaultStyle = {
    height: "0px",
    transition: `height ${duration}ms ease-in-out`,
  }

  const transitionStyles = {
    entered: {
      height: props.height,
    },
    entering: {
      height: "0px",
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
