import React from "react"
import { Transition } from "react-transition-group"

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
}

export default props => {
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
