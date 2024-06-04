import * as React from "react"
import * as Yup from "yup"
import { Text, FullBleed } from "@artsy/palette"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

const Schema = Yup.object().shape({
  myCollectionArtworkID: Yup.string().required().trim(),
})

interface FormValues {
  myCollectionArtworkID: string
}

export const NewFromMyCollectionRoute: React.FC = () => {
  const initialValues: FormValues = {
    myCollectionArtworkID: "",
  }

  const onSubmit = async (values: FormValues) => {
    // TODO: Create a new submission from the selected artwork
  }

  return (
    <FullBleed>
      <AppContainer>
          <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount
            validationSchema={Schema}
          >
            {formik => (
              <SubmissionLayout hideNavigation>
                <Text mb={2} variant="lg-display">
                  Start from My Collection
                </Text>
                <Text variant="sm">--- TODO: My Collection Artwork Grid ---</Text>
                <DevDebug />
              </SubmissionLayout>
            )}
        </Formik>
      </AppContainer>
    </FullBleed>
  )
}
