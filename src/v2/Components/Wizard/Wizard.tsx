import { Form, Formik, FormikHelpers as FormikActions } from "formik"
import { isEmpty } from "lodash"
import PropTypes from "prop-types"
import { Component } from "react"
import * as React from "react"
import { StepElement, StepProps, WizardRenderProps } from "./types"
import { FormValues, WizardContext } from "./types"

interface WizardProps {
  onComplete?: (
    values?: FormValues,
    actions?: FormikActions<FormValues>
  ) => void
  initialValues?: any
  steps?: StepElement[]
  children?:
    | ((props: {
        wizard: WizardRenderProps
        form: any
      }) => React.ReactElement<any>)
    | StepElement
    | StepElement[]
}

interface WizardState {
  currentStepIndex: number
}

/**
 * Generate a multi-step wizard wrapped in a form.
 * steps can be an Array of children of the shape
 *
 * The wizard can be used in two different ways,
 * using the render prop API or passing steps in
 * as children.
 *
 * @example
 *
 * ```javascript
 * <Wizard steps={[<Step />, <Step />]}>
 *  {({ wizard, form }) => {
 *   <div>
 *     Current step: {wizard.currentStepIndex}
 *     <div>{wizard.currentStep}</div>
 *     <NextButton onClick={wizard.next} />
 *   </div>
 *  }}
 * </Wizard>
 * ```
 *
 * or
 *
 * ```javascript
 * <Wizard>
 *   <Step />
 *   <Step />
 * </Wizard>
 * ```
 */
export class Wizard extends React.Component<WizardProps, WizardState> {
  static defaultProps = {
    initialValues: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      currentStepIndex: 0,
    }
  }

  get steps(): StepElement[] {
    if (!!this.props.steps) {
      return this.props.steps
    } else {
      return React.Children.toArray(this.props.children) as Array<
        React.ReactElement<StepProps>
      >
    }
  }

  get currentStep() {
    return this.steps[this.state.currentStepIndex] as StepElement
  }

  get isLastStep() {
    return this.state.currentStepIndex === this.steps.length - 1
  }

  get wizardProps(): WizardRenderProps {
    return {
      currentStep: this.currentStep,
      isLastStep: this.isLastStep,
      previous: this.previous,
      next: this.next,
      currentStepIndex: this.state.currentStepIndex,
      steps: this.steps,
      shouldAllowNext: false,
      progressPercentage: (this.state.currentStepIndex + 1) / this.steps.length,
    }
  }

  next = (e: React.FormEvent<any> | null, values) => {
    e && e.preventDefault()
    this.setState(state => ({
      currentStepIndex: Math.min(
        state.currentStepIndex + 1,
        this.steps.length - 1
      ),
      values,
    }))
  }

  previous = (e: React.FormEvent<any> | null, values) => {
    e && e.preventDefault()
    this.setState(state => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    }))
  }

  handleSubmit: (
    values: FormValues,
    actions?: FormikActions<FormValues>
  ) => void = (values, actions) => {
    const { onComplete } = this.props
    if (this.isLastStep) {
      onComplete && onComplete(values, actions)
    } else {
      actions?.setSubmitting(false)
      // If exist, call onSubmit on the current step
      const onSubmit = this.currentStep.props.onSubmit
      if (onSubmit) {
        actions?.setSubmitting(true)
        const result = onSubmit(values, actions)

        if (result instanceof Boolean) {
          actions?.setSubmitting(false)
          return result
        } else {
          return (result as Promise<boolean>).then(shouldGoNext => {
            if (shouldGoNext) {
              actions?.setSubmitting(false)
              this.next(null, values)
            }
          })
        }
      } else {
        this.next(null, values)
      }
    }
  }

  render() {
    const { initialValues, children } = this.props
    const { validate, validationSchema } = this.currentStep.props

    return (
      <Formik
        initialValues={initialValues}
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        validate={validate}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={this.handleSubmit}
      >
        {formikRenderProps => {
          const context: WizardContext = {
            wizard: this.wizardProps,
            form: formikRenderProps,
          }

          context.wizard.shouldAllowNext =
            isEmpty(formikRenderProps.errors) &&
            !isEmpty(formikRenderProps.touched)

          return (
            <Form>
              <WizardContextProvider {...context}>
                {!!this.props.steps
                  ? React.createElement(children as any, context)
                  : this.currentStep}
              </WizardContextProvider>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

class WizardContextProvider extends Component<WizardContext> {
  static childContextTypes = {
    wizard: PropTypes.object,
    form: PropTypes.object,
  }

  getChildContext(): WizardContext {
    return {
      wizard: this.props.wizard,
      form: this.props.form,
    }
  }

  render() {
    return this.props.children
  }
}
