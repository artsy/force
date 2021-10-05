import React, { FC } from "react"
import { Button, Clickable, Spacer, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Formik } from "formik"
import { ArtworkDetailsForm } from "./Components/ArtworkDetailsForm"

export const ArtworkDetails: FC = () => {
  return (
    <>
      <Clickable onClick={() => {}}>
        <Text variant="sm">{"< Back..."}</Text>
      </Clickable>
      <Spacer mt={6} />
      <SubmissionStepper currentStep="Artwork Details" />
      <Spacer mb={4} />
      <Text variant="lg">Tell us about your artwork</Text>
      <Spacer mb={1} />
      <Text variant="sm" color="black60">
        All fields are required to submit a work.
      </Text>
      <Spacer mb={6} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ isSubmitting }) => (
          <>
            <ArtworkDetailsForm />
            <Spacer mt={6} />
            <Button
              type="submit"
              size="medium"
              variant="primaryBlack"
              loading={isSubmitting}
              mt={2}
            >
              Save and Continue
            </Button>
          </>
        )}
      </Formik>
    </>
  )
}
