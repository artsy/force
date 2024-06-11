import { Spacer, Text } from "@artsy/palette"
import {
  ArtistAutoComplete,
  AutocompleteArtist,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { RouterLink } from "System/Router/RouterLink"
import {
  ArtistRoute_submission$data,
  ArtistRoute_submission$key,
} from "__generated__/ArtistRoute_submission.graphql"
import { Formik, FormikProps } from "formik"
import { useRouter } from "found"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

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
  artistName: Yup.string().required(),
  artistId: Yup.string().required(),
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
  const { router } = useRouter()
  const { actions } = useSellFlowContext()

  const isNewSubmission = !submission?.internalID

  const onSubmit = async (values: FormValues) => {}

  const createSubmission = async (artist: AutocompleteArtist) => {
    if (!artist?.internalID) return

    const isTargetSupply = artist?.targetSupply?.isTargetSupply

    if (!isTargetSupply) {
      router.push(`/sell2/artist-not-eligible/${artist.internalID}`)
      return
    }

    const response = await actions.createSubmission({
      artistID: artist.internalID,
    })
    const submissionID =
      response?.createConsignmentSubmission?.consignmentSubmission?.externalId

    router.replace(`/sell2/submissions/${submissionID}/artist`)
    router.push(`/sell2/submissions/${submissionID}/title`)
  }

  const updateSubmission = async (artist: AutocompleteArtist) => {
    if (!artist?.internalID) return

    const isTargetSupply = artist?.targetSupply?.isTargetSupply
    if (!isTargetSupply) {
      return
    }

    await actions.updateSubmission({ artistID: artist.internalID })
    actions.goToNextStep()
  }

  const onSelect = async (
    artist: AutocompleteArtist,
    formik: FormikProps<FormValues>
  ) => {
    if (!artist?.internalID) return

    const isTargetSupply = artist?.targetSupply?.isTargetSupply
    formik.setFieldValue("isTargetSupply", isTargetSupply)

    if (isNewSubmission) {
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
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {formik => (
        <SubmissionLayout hideNavigation={isNewSubmission}>
          <Text mb={2} variant="xl">
            Add artist name
          </Text>

          <ArtistAutoComplete
            onSelect={artist => {
              onSelect(artist, formik)
            }}
            onError={() => console.error("something happened")}
            showChevronIcon
            title="Artist"
          />

          <Text mt={2} variant="sm" color="black60">
            Currently, artists can not sell their own work on Artsy.{" "}
            <RouterLink to="https://support.artsy.net/s/article/Im-an-artist-Can-I-submit-my-own-work-to-sell">
              Learn more.
            </RouterLink>
          </Text>

          {!isNewSubmission &&
            formik.values.artistId &&
            !formik.values.isTargetSupply && (
              <>
                <Spacer y={2} />
                <Text variant="lg">
                  This artist isn't currently eligible to sell on our platform
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
                  . After adding to My Collection, an Artsy Advisor will be in
                  touch if there is an opportunity to sell your work in the
                  future.
                </Text>
              </>
            )}

          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
