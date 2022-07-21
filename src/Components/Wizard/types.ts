import { FormikHelpers as FormikActions, FormikProps } from "formik"

export type FormValues = { [key: string]: any } | null
export type FormErrors = { [key: string]: any } | null

export type StepElement = React.ReactElement<StepProps>

// Extending WizardContext here causes
// `Type '(e: FormEvent<HTMLFormElement>) => any' is not assignable to type '(event: MouseEvent<Button>) => void'
// in form.handleSubmit for button onClick prop
// OR '(e: FormEvent<any>, values: { [key: string]: any; }) => void' is not assignable to type '(event: MouseEvent<Button>) => void'
// for wizard.previous  for button OnClick prop
export interface WizardStepChildProps {
  form: any
  wizard: any
}

export interface StepProps {
  label?: string
  validate?: (values: FormValues) => FormErrors
  validationSchema?: object
  children:
    | React.ComponentClass<WizardStepChildProps>
    | React.SFC<WizardStepChildProps>
  onSubmit?: (
    values: FormValues,
    actions?: FormikActions<FormValues>
  ) => boolean | Promise<boolean>
}

export interface WizardRenderProps {
  currentStep: StepElement
  isLastStep: boolean
  previous: (e: React.FormEvent<any> | null, values: FormValues) => void
  next: (e: React.FormEvent<any> | null, values: FormValues) => void
  currentStepIndex: number
  steps: StepElement[]
  shouldAllowNext: boolean
  progressPercentage: number
}

export interface WizardContext {
  wizard: WizardRenderProps
  form: FormikProps<any>
}
