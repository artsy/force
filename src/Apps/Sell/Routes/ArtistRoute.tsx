import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Text, useToasts } from "@artsy/palette"
import {
  ArtistAutoComplete,
  AutocompleteArtist,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { ArtistNotEligiblText } from "Apps/Sell/Components/ArtistNotEligibleText"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import {
  ArtistRoute_submission$data,
  ArtistRoute_submission$key,
} from "__generated__/ArtistRoute_submission.graphql"
import { Formik, FormikProps } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const logger = createLogger("ArtistRoute.tsx")

const FRAGMENT = graphql`
  fragment ArtistRoute_submission on ConsignmentSubmission {
    internalID
    artist {
      internalID
      targetSupply {
        isTargetSupply
      }
      name
    }
  }
`

const Schema = Yup.object().shape({
  artistName: Yup.string().required("Artist is required"),
  artistId: Yup.string().required("Artist is required"),
  isTargetSupply: Yup.boolean().isTrue(),
})

interface FormValues {
  artistId: string
  artistName: string
  isTargetSupply: boolean
}

interface ArtistRouteProps {
  submission: ArtistRoute_submission$key
}

export const ArtistRouteFragmentContainer: React.FC<ArtistRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  return <ArtistRoute submission={submission} />
}

export const ArtistRoute: React.FC<{
  submission?: ArtistRoute_submission$data
}> = ({ submission }) => {
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const { router } = useRouter()
  const { actions } = useSellFlowContext()
  const { sendToast } = useToasts()

  const isNewSubmission = !submission?.internalID

  const createSubmission = async (artist: AutocompleteArtist) => {
    if (!isLoggedIn) {
      showAuthDialog({
        mode: "Login",
        options: {
          title: () => {
            return "Log in to submit an artwork for sale"
          },
        },
        analytics: {
          contextModule: ContextModule.sellFooter,
          intent: Intent.login,
        },
      })

      return
    }

    if (!artist?.internalID) return

    const isTargetSupply = artist?.targetSupply?.isTargetSupply

    if (!isTargetSupply) {
      router.push(`/sell/artist-not-eligible/${artist.internalID}`)
      return
    }

    try {
      const response = await actions.createSubmission({
        artistID: artist.internalID,
      })

      const submissionID =
        response?.createConsignmentSubmission?.consignmentSubmission?.externalId

      if (!submissionID) {
        sendToast({
          variant: "error",
          message: "Something went wrong.",
        })
        throw new Error("Submission ID not found.")
      }

      router.replace(`/sell/submissions/${submissionID}/artist`)
      router.push(`/sell/submissions/${submissionID}/title`)
    } catch (error) {
      logger.error("Error creating submission.", error)
    }
  }

  const updateSubmission = async (artist: AutocompleteArtist) => {
    if (!artist?.internalID) return

    const isTargetSupply = artist?.targetSupply?.isTargetSupply
    if (!isTargetSupply) {
      return
    }

    try {
      await actions.updateSubmission({ artistID: artist.internalID })

      actions.goToNextStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    }
  }

  const onSelect = async (
    artist: AutocompleteArtist,
    formik: FormikProps<FormValues>
  ) => {
    if (!artist?.internalID) {
      return
    }

    const isTargetSupply = artist?.targetSupply?.isTargetSupply

    formik.setFieldValue("isTargetSupply", isTargetSupply)

    if (isNewSubmission) {
      if (!isTargetSupply) {
        router.push(`/sell/artist-not-eligible/${artist.internalID}`)
        return
      }

      createSubmission(artist)
    } else {
      updateSubmission(artist)
    }
  }

  const initialValues: FormValues = {
    artistName: submission?.artist?.name || "",
    artistId: submission?.artist?.internalID || "",
    isTargetSupply: submission?.artist?.targetSupply?.isTargetSupply || false,
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={() => {}}
      validateOnMount
      validationSchema={Schema}
    >
      {formik => (
        <SubmissionLayout hideNavigation={isNewSubmission}>
          <SubmissionStepTitle>Add artist name</SubmissionStepTitle>

          <ArtistAutoComplete
            onSelect={artist => {
              onSelect(artist, formik)
            }}
            onError={() =>
              logger.error("Something went wrong while fetching artists.")
            }
            showChevronIcon
            title="Artist"
          />

          {!formik.values.artistName && (
            <Text mt={2} variant="sm" color="black60">
              Currently, artists can not sell their own work on Artsy.{" "}
              <RouterLink
                to="https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more.
              </RouterLink>
            </Text>
          )}

          {!isNewSubmission &&
            formik.values.artistId &&
            !formik.values.isTargetSupply && (
              <Box my={2}>
                <Text variant="lg">
                  This artist isn't currently eligible to sell on our platform
                </Text>

                <ArtistNotEligiblText />
              </Box>
            )}

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
