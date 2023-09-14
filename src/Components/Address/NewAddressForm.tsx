import * as Yup from "yup"
import { Column, GridColumns, Input, Message } from "@artsy/palette"
import { Formik, FormikConfig, useFormikContext } from "formik"
import { FC } from "react"
import { CountrySelect } from "Components/CountrySelect"

export interface AddressFormValues {
  name?: string
  country?: string
  addressLine1?: string
  city?: string
  region?: string
  postalCode?: string
  addressLine2?: string
}

export type AddressChangeHandler = (
  address: AddressFormValues,
  key: keyof AddressFormValues
) => void

export const EMPTY_ADDRESS = {
  name: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  region: "",
}

// A default validation schema for an address form.
// Requires all fields except addressLine2 to be present.
// You can override this by providing a custom validationSchema or validate prop
export const DEFAULT_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  postalCode: Yup.string().required("Postal Code is required"),
})

export interface AddressFormWrapperProps<T extends AddressFormValues>
  extends Omit<FormikConfig<T>, "initialValues"> {
  initialValues: Partial<T>
}

/**
 * A Formik context that provides a default validation schema and initial values
 * for an address form. Provide a custom type extending `AddressFormValues` to
 * add additional fields, along with other Formik props. The children should
 * formik-compatible contain inputs for any AddressFormValues and other fields.
 */
export const AddressFormWrapper = <
  T extends AddressFormValues = AddressFormValues
>({
  initialValues = {} as Partial<T>,
  children,
  validate,
  validationSchema,
  ...props
}: AddressFormWrapperProps<T>): JSX.Element => {
  let validationRule: Pick<FormikConfig<T>, "validate" | "validationSchema">
  if (validate) {
    validationRule = { validate }
  } else {
    validationRule = {
      validationSchema: validationSchema || DEFAULT_VALIDATION_SCHEMA,
    }
  }

  return (
    <Formik<T>
      initialValues={{
        ...(EMPTY_ADDRESS as T),
        ...initialValues,
      }}
      {...validationRule}
      {...props}
    >
      {children}
    </Formik>
  )
}

/**
 * An input layout that can be used in the context of a form to collect an address. It provides a default
 * layout for the address fields and can be used with the `AddressFormWrapper`
 * to provide default values and validation - or you can add your own additional
 * values (include types that extend <AddressFormValues>) and override validation.
 * **Children (additional inputs, a submit button) are optional and will be rendered after the address fields inside a GridColumns
 * wrapper**.
 * @example
 * ```tsx
 *  const BasicExample: React.FC<{}> = () => {
 *   return (
 *     <AddressFormWrapper<AddressFormValues>
 *       initialValues={initialAddress}
 *       onSubmit={values => {
 *         alert(JSON.stringify(values))
 *       }}
 *     >
 *      <Form>
 *        <AddressInputs>
 *          <Column span={12}>
 *            <Button type="submit">Submit</Button>
 *          </Column>
 *        </AddressInputs>
 *      </Form>
 *     </AddressFormWrapper>
 *   )
 *  }
 * ```
 */
export const AddressInputs: FC = ({ children }) => {
  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
  } = useFormikContext<AddressFormValues>()
  return (
    <GridColumns data-testid="address-inputs">
      <Column span={12}>
        <Input
          name="name"
          aria-label="address-name-input"
          title="Add full name"
          placeholder="Enter name"
          autoComplete="name"
          autoFocus
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.name && errors?.name}
          required
        />
      </Column>

      <Column span={12}>
        <CountrySelect
          title="Country"
          data-testid="address-country-select"
          aria-label="address-country-select"
          name="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.country && errors?.country}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="addressLine1"
          aria-label="address-street-input"
          title="Address line 1"
          placeholder="Add street address"
          autoComplete="address-line1"
          value={values.addressLine1}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.addressLine1 && errors?.addressLine1}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="addressLine2"
          aria-label="address-optional-second-line-input"
          title="Address line 2 (optional)"
          placeholder="Add apt, floor, suite, etc."
          autoComplete="address-line2"
          value={values.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.addressLine2 && errors?.addressLine2}
        />
      </Column>

      <Column span={12}>
        <Input
          name="postalCode"
          aria-label="address-postal-code-input"
          title="Postal Code"
          placeholder="Add postal code"
          autoComplete="postal-code"
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.postalCode && errors?.postalCode}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="city"
          aria-label="address-city-input"
          title="City"
          placeholder="Add city"
          autoComplete="address-level2"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.city && errors?.city}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="region"
          aria-label="address-state-or-region-input"
          title="State, Province, or Region"
          placeholder="Add state, province, or region"
          autoComplete="address-level1"
          value={values.region}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.region && errors?.region}
          required
        />
      </Column>

      {status?.error && (
        <Column span={12}>
          <Message variant="error">
            {status.message || "Something went wrong. Please try again."}
          </Message>
        </Column>
      )}
      {children && children}
    </GridColumns>
  )
}
