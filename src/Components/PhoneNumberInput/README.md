## `PhoneNumberInput`

`PhoneNumberInput` a simple component which compounds a `Select` and an `Input`. The `Select` is configured to display international phone number country codes. It will select a 2-letter string value for those countries, but display the numeric phone code and the relevant country flag. The `Input` is simply a `type="tel"` input. We make no assumptions about the structure of your Formik setup, pass props as if they were normal fields to both `selectProps` and `inputProps`.

## `validatePhoneNumber`

`validatePhoneNumber` is a debounced (200ms), asyncronous function which returns a boolean value as to whether or not the given `phoneNumber` (`regionCode` and `national`) values constitute a valid `international` phone number. It can be used in a Yup validation schema:

```ts
{
  // ...
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        return validatePhoneNumber({
          national: `${national}`,
          regionCode: `${context.parent.regionCode}`,
        })
      },
    }),
    // ...
}
```
