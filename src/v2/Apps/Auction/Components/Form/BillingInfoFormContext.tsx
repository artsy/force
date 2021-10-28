import React, { forwardRef } from "react"
import { Formik, FormikHelpers } from "formik"
import {
  BillingInfoFormValues,
  BillingInfoFormKeys,
  composeBillingInfoForm,
} from "./formValidation"

interface BillingInfoFormProps {
  children: React.ReactNode
  formKeys: BillingInfoFormKeys[]
  initialValues?: Partial<BillingInfoFormValues>
  onSubmit: (
    values: BillingInfoFormValues,
    formikHelpers: FormikHelpers<BillingInfoFormValues>
  ) => void | Promise<any>
  ref?: React.RefObject<any>
}

function FormContext(
  { children, onSubmit, formKeys, initialValues }: BillingInfoFormProps,
  ref: any
): React.ReactElement<BillingInfoFormProps> {
  const { values, schema } = composeBillingInfoForm(formKeys)
  const composedValues = { ...values, ...initialValues }

  return (
    <Formik
      innerRef={ref}
      initialValues={composedValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      validateOnMount
    >
      {children}
    </Formik>
  )
}

export const BillingInfoFormContext = forwardRef<BillingInfoFormProps>(
  FormContext
) as React.ForwardRefExoticComponent<BillingInfoFormProps>
