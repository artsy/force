import * as React from "react"
import * as Yup from "yup"
import { Avatar, Box, Flex, Input, Join, Spacer, Text } from "@artsy/palette"
import { TitleRoute_submission$key } from "__generated__/TitleRoute_submission.graphql"
import { graphql, useFragment } from "react-relay"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

const FRAGMENT = graphql`
  fragment TitleRoute_submission on ConsignmentSubmission {
    title
    artist {
      name
      formattedNationalityAndBirthday
      avatar: image {
        cropped(width: 38, height: 38) {
          src
          srcSet
          height
          width
        }
      }
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
    // return createOrUpdateConsignSubmission(relayEnvironment, values)
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    title: submission.title ?? "",
  }

  const artistAvatar = submission.artist?.avatar?.cropped

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
            <Flex justifyContent="space-between">
              <Flex alignItems="center" p={1} width="100%">
                {artistAvatar ? (
                  <Avatar
                    src={artistAvatar?.src}
                    srcSet={artistAvatar?.srcSet}
                    width={artistAvatar?.width}
                    height={artistAvatar?.height}
                    alt="artist avatar"
                  />
                ) : (
                  <Box width={38} height={38} backgroundColor="black10" />
                )}
                <Flex ml={1} flexDirection="column">
                  <Text variant="sm-display">{submission.artist?.name}</Text>
                  <Text lineHeight={1.5} variant="sm-display" color="black60">
                    {submission?.artist?.formattedNationalityAndBirthday}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Input
              onChange={handleChange}
              name="title"
              placeholder="Artwork Title"
              defaultValue={values.title} // This is your GraphQL fragment
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
