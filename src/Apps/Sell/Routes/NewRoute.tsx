import * as React from "react"
import * as Yup from "yup"
import {
  ArtistAutoComplete,
  AutocompleteArtist,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { Box, Text, Flex, Spacer } from "@artsy/palette"
import { ArtworkFormContextProvider } from "Apps/Sell/ArtworkFormContext"
import { Formik } from "formik"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { useSystemContext } from "System/SystemContext"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { useRouter } from "found"
import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

const Schema = Yup.object().shape({
  artistId: Yup.string().required().trim(),
})

interface FormValues {
  artistId: string
}
const IneligibleArtistMessage: React.FC = () => {
  return (
    <>
      <Text variant="lg">
        This artist isn't currently eligible to sell on our platform
      </Text>
      <Text mt={2} variant="sm">
        Try again with another artist or add your artwork to My Collection, your
        personal space to manage your collection, track demand for your artwork
        and see updates about the artist. If you'd like to know more, you can&nbsp;
        <RouterLink to="#">
          contact an advisor&nbsp;
        </RouterLink>
         or read about&nbsp;
        <RouterLink to="#">
          what our specialists are looking for
        </RouterLink>
        . After adding to My Collection, an Artsy Advisor will be in touch if
        there is an opportunity to sell your work in the future. 
      </Text>
    </>
  )
}

const InnerForm: React.FC = () => {
  const { router } = useRouter()
  const { relayEnvironment } = useSystemContext()
  const [
    showIneligibleArtistMessage,
    setShowIneligibleArtistMessage,
  ] = useState(false)

  const onSelect = async (artist: AutocompleteArtist) => {
    if (artist) {
      if (artist.targetSupply?.isTargetSupply) {
        const externalID = await createOrUpdateConsignSubmission(
          relayEnvironment,
          {
            artistID: artist?.internalID,
          }
        )

        router.push(`/sell2/submissions/${externalID}/title`)
      } else {
        setShowIneligibleArtistMessage(true)
      }
    }
  }

  return (
    <>
      <ArtistAutoComplete
        onSelect={onSelect}
        onError={() => console.error("something happened")}
        title="Artist"
      />
      {showIneligibleArtistMessage && (
        <>
          <Spacer y={2} />
          <IneligibleArtistMessage />
        </>
      )}
      <DevDebug />
    </>
  )
}

export const NewRoute: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  const onSubmit = async (values: FormValues) => {
    return createOrUpdateConsignSubmission(relayEnvironment, {
      artistID: values.artistId,
    })
  }

  const initialValues: FormValues = {
    artistId: "",
  }

  return (
    <AppContainer>
      <SubmissionHeader />
      <ArtworkFormContextProvider>
        <Flex py={4} flexDirection="column" alignItems="center">
          <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount
            validationSchema={Schema}
          >
            <Box width={800}>
              <Text mb={2} variant="lg-display">Add artist name</Text>
              <InnerForm />
            </Box>
          </Formik>
        </Flex>
      </ArtworkFormContextProvider>
    </AppContainer>
  )
}
