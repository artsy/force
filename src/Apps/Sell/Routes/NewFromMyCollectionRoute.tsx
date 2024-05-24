import * as React from "react"
import * as Yup from "yup"
import { Box, Text, Flex } from "@artsy/palette"
import { ArtworkFormContextProvider } from "Apps/Sell/ArtworkFormContext"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

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

  return (
    <AppContainer>
      <SubmissionHeader />
      <ArtworkFormContextProvider>
        <Flex py={4} flexDirection="column" alignItems="center">
          <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={() => {}}
            validateOnMount
            validationSchema={Schema}
          >
            <Box minWidth={800}>
              <Text mb={2} variant="lg-display">Start from My Collection</Text>
              <Text variant="sm">--- TODO: My Collection Artwork Grid ---</Text>
              <DevDebug />
            </Box>
          </Formik>
        </Flex>
      </ArtworkFormContextProvider>
    </AppContainer>
  )
}
