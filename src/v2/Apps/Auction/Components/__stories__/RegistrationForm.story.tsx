import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { RegistrationForm } from "../RegistrationForm"

storiesOf("Apps/Auction/Components", module)
  .add("RegistrationForm w/o ID verification", () => {
    return (
      <Section>
        <RegistrationForm
          onSubmit={(values, actions) => {
            window.alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }}
          trackSubmissionErrors={errors =>
            console.warn("Tracking errors: ", errors)
          }
          needsIdentityVerification={false}
        />
      </Section>
    )
  })
  .add("RegistrationForm with ID verification", () => {
    return (
      <Section>
        <RegistrationForm
          onSubmit={(values, actions) => {
            window.alert(window.alert(JSON.stringify(values, null, 2)))
            actions.setSubmitting(false)
          }}
          trackSubmissionErrors={errors =>
            console.warn("Tracking errors: ", errors)
          }
          needsIdentityVerification
        />
      </Section>
    )
  })
