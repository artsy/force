import * as React from "react"
import ReactCSSTransitionReplace from "react-css-transition-replace"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle<{ suppressMultiMountWarning: boolean }>`
  .fade-wait-leave {
    opacity: 1;
  }

  .fade-wait-leave.fade-wait-leave-active {
    opacity: 0;
    transition: opacity 0.4s ease-in;
  }

  .fade-wait-enter {
    opacity: 0;
  }

  .fade-wait-enter.fade-wait-enter-active {
    opacity: 1;

    /* Delay the enter animation until the leave completes */
    transition: opacity 0.4s ease-in 0.6s;
  }

  .fade-wait-height {
    transition: height 0.6s ease-in-out;
  }
`

export default props => {
  return (
    <>
      <GlobalStyle suppressMultiMountWarning />
      <ReactCSSTransitionReplace transitionName="fade-wait" {...props}>
        {{ ...props.children }}
      </ReactCSSTransitionReplace>
    </>
  )
}
