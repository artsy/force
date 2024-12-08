import { createElement, Component } from "react"
import { StepProps } from "./types"

/**
 * Step within a Wizard.
 *
 * @example
 *
 * ```javascript
 * <Step label="One">
 *   {context =>
 *    <Button onClick={context.wizard.next}>Next</Button>
 *   }
 * </Step>
 * ```
 */
export class Step extends Component<StepProps> {
  static contextTypes = {
    wizard: {},
    form: {},
  }

  render() {
    // FIXME: REACT_18_UPGRADE
    // @ts-ignore
    if (!this.context.wizard) {
      return null
    }
    // FIXME: REACT_18_UPGRADE
    // @ts-ignore
    const { wizard, form } = this.context
    return createElement(this.props.children, { wizard, form })
  }
}
