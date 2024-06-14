import { Input, Join, Spacer, Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { TitleRoute_submission$key } from "__generated__/TitleRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment TitleRoute_submission on ConsignmentSubmission {
    title
    artist {
      ...EntityHeaderArtist_artist
    }
  }
`

const Schema = Yup.object().shape({
  title: Yup.string().required().trim(),
})

interface FormValues {
  title: string
}

interface TitleRouteProps {
  submission: TitleRoute_submission$key
}

export const TitleRoute: React.FC<TitleRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const { actions } = useSellFlowContext()

  const onSubmit = async (values: FormValues) => {
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    title: submission.title ?? "",
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      {({ handleChange, values }) => (
        <SubmissionLayout>
          <Join separator={<Spacer y={2} />}>
            <Text variant="xl">Add artwork title</Text>

            {!!submission.artist && (
              <EntityHeaderArtistFragmentContainer
                artist={submission.artist}
                displayFollowButton={false}
              />
            )}

            <Input
              onChange={handleChange}
              name="title"
              placeholder="Artwork Title"
              defaultValue={values.title}
            />
            <Text variant="sm" color="black60">
              Add ‘Unknown’ if unsure
            </Text>
          </Join>
          <DevDebug />
        </SubmissionLayout>
      )}
    </Formik>
  )
}
