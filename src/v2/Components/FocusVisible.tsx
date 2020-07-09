import "focus-visible"
import { color } from "@artsy/palette"
import { createGlobalStyle } from "styled-components"

export const FocusVisible = createGlobalStyle`
  /**
  * This will hide the focus indicator if the element receives focus via the mouse,
  * but it will still show up on keyboard focus. <input> tags are an exception to this.
  */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: 0;
  }

  /* Custom outlines on :focus-visible */
  .focus-visible {
    outline: 1px solid ${color("purple100")};
  }
`
