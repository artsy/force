import PropTypes from "prop-types"
import { Component } from "react"
import React from "react"
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
    form: PropTypes.object,
    wizard: PropTypes.object,
  }

  render() {
    if (!this.context.wizard) {
      return null
    }
    const { wizard, form } = this.context
    return React.createElement(this.props.children, { form, wizard })
  }
}
