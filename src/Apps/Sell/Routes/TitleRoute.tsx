import * as React from "react"
import * as Yup from "yup"
import { Input, Text } from "@artsy/palette"
import { TitleRoute_submission$key } from "__generated__/TitleRoute_submission.graphql"
import { graphql, useFragment } from "react-relay"
import { Formik, useFormikContext } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"

const FRAGMENT = graphql`
  fragment TitleRoute_submission on ConsignmentSubmission {
    title
  }
`

const Schema = Yup.object().shape({
  title: Yup.string().required().trim(),
})

interface FormValues {
  title: string
}

const InnerForm: React.FC = props => {
  const { values, handleChange } = useFormikContext<FormValues>()

  return (
    <>
      <Input
        onChange={handleChange}
        required
        name="title"
        title="Title"
        defaultValue={values.title} />
    </>
  )
}

interface TitleRouteProps {
  submission: TitleRoute_submission$key
}

export const TitleRoute: React.FC<TitleRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)
  const { actions } = useArtworkFormContext()

  const onSubmit = async (values: FormValues) => {
    // return createOrUpdateConsignSubmission(relayEnvironment, values)
    return actions.updateSubmission(values)
  }

  const initialValues: FormValues = {
    title: submission.title ?? "",
  }

  return (
    <>
      <Text mb={2} variant="xl">Add artwork title</Text>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnMount
        validationSchema={Schema}
      >
        <>
          <InnerForm />
          <DevDebug />
          <BottomFormNavigation />
        </>
      </Formik>
    </>
  )
}
