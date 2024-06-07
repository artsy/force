import { FullBleed, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import {
  ArtistAutoComplete,
  AutocompleteArtist,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useCreateSubmission } from "Apps/Sell/Mutations/useCreateSubmission"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { RouterLink } from "System/Router/RouterLink"
import { Formik, FormikProps } from "formik"
import { useRouter } from "found"
import * as React from "react"
import * as Yup from "yup"

const Schema = Yup.object().shape({
  artistId: Yup.string().required(),
  isTargetSupply: Yup.boolean().isTrue(),
})

interface FormValues {
  artistId: string
  isTargetSupply: boolean
}

export const NewRoute: React.FC = () => {
  const { router } = useRouter()
  const {
    submitMutation: submitCreateSubmissionMutation,
  } = useCreateSubmission()

  const onSubmit = async (values: FormValues) => {}

  const onSelect = async (
    artist: AutocompleteArtist,
    formik: FormikProps<FormValues>
  ) => {
    const isTargetSupply = artist?.targetSupply?.isTargetSupply
    formik.setFieldValue("isTargetSupply", isTargetSupply)

    if (artist?.internalID && isTargetSupply) {
      const response = await submitCreateSubmissionMutation({
        variables: {
          input: { artistID: artist.internalID },
        },
      })

      const submissionID =
        response.createConsignmentSubmission?.consignmentSubmission?.externalId

      router.push(`/sell2/submissions/${submissionID}/title`)
    }
  }

  const initialValues: FormValues = {
    artistId: "",
    isTargetSupply: false,
  }

  return (
    <FullBleed>
      <AppContainer>
        <SellFlowContextProvider>
          <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount
            validationSchema={Schema}
          >
            {formik => (
              <SubmissionLayout hideNavigation>
                <Text mb={2} variant="xl">
                  Add artist name
                </Text>

                <ArtistAutoComplete
                  onSelect={artist => {
                    onSelect(artist, formik)
                  }}
                  onError={() => console.error("something happened")}
                  title="Artist"
                />

                <Text mt={2} variant="sm" color="black60">
                  Currently, artists can not sell their own work on Artsy.{" "}
                  <RouterLink to="https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell">
                    Learn more.
                  </RouterLink>
                </Text>

                {formik.values.artistId && !formik.values.isTargetSupply && (
                  <>
                    <Spacer y={2} />
                    <Text variant="lg">
                      This artist isn't currently eligible to sell on our
                      platform
                    </Text>
                    <Text mt={2} variant="sm">
                      Try again with another artist or add your artwork to My
                      Collection, your personal space to manage your collection,
                      track demand for your artwork and see updates about the
                      artist. If you'd like to know more, you can&nbsp;
                      <RouterLink to="#">contact an advisor&nbsp;</RouterLink>
                      or read about&nbsp;
                      <RouterLink to="#">
                        what our specialists are looking for
                      </RouterLink>
                      . After adding to My Collection, an Artsy Advisor will be
                      in touch if there is an opportunity to sell your work in
                      the future.
                    </Text>
                  </>
                )}

                <DevDebug />
              </SubmissionLayout>
            )}
          </Formik>
        </SellFlowContextProvider>
      </AppContainer>
    </FullBleed>
  )
}
