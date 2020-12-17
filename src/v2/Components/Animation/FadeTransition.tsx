import React from "react"
import { Transition } from "react-transition-group"

const duration = 300

const defaultStyle = {
  opacity: 0,
  transition: `opacity ${duration}ms ease-in-out`,
}

const transitionStyles = {
  entered: {
    opacity: 1,
  },
  entering: {
    opacity: 0,
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
