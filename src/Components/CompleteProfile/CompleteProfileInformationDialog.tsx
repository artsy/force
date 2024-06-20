import {
  Button,
  Input,
  ModalDialog,
  SkeletonText,
  Stack,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CompleteProfileInformationDialogQuery } from "__generated__/CompleteProfileInformationDialogQuery.graphql"
import { Form, Formik } from "formik"
import {
  Location,
  LocationAutocompleteInput,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"

interface CompleteProfileInformationDialogProps {
  title: string
  onClose(): void
}

export const CompleteProfileInformationDialog: FC<CompleteProfileInformationDialogProps> = ({
  title,
  onClose,
}) => {
  return (
    <ModalDialog width={550} title={title} onClose={onClose}>
      <Suspense fallback={<CompleteProfileInformationDialogFormSkeleton />}>
        <CompleteProfileInformationDialogForm />
      </Suspense>
    </ModalDialog>
  )
}

interface CompleteProfileInformationDialogFormProps {}

const CompleteProfileInformationDialogForm: FC<CompleteProfileInformationDialogFormProps> = () => {
  const { me } = useLazyLoadQuery<CompleteProfileInformationDialogQuery>(
    QUERY,
    {},
    { fetchPolicy: "network-only" }
  )

  const { sendToast } = useToasts()

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  const handleSubmit = async (
    values: CompleteProfileInformationDialogFormInput
  ) => {
    try {
      const location = {
        city: values.location?.city || null,
        state: values.location?.state || null,
        country: values.location?.country || null,
        countryCode: values.location?.countryCode || null,
      }

      const payload = {
        name: values.name,
        location,
        profession: values.profession,
        otherRelevantPositions: values.otherRelevantPositions,
      }

      await submitUpdateMyUserProfile(payload)

      sendToast({ variant: "success", message: "Profile information saved." })
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })
    }
  }

  return (
    <Formik<CompleteProfileInformationDialogFormInput>
      onSubmit={handleSubmit}
      initialValues={{
        name: me?.name ?? "",
        location: me?.location ?? {},
        profession: me?.profession ?? "",
        otherRelevantPositions: me?.otherRelevantPositions ?? "",
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        dirty,
        isSubmitting,
      }) => {
        return (
          <Stack as={Form} gap={4}>
            <Stack gap={2}>
              <Text variant="xs" color="black60">
                Complete your profile and make a great impression. Galleries are
                more likely to respond to collectors with complete profiles.
              </Text>

              <Input
                title="Full name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <LocationAutocompleteInput
                name="location"
                title="Location"
                placeholder="Enter your city"
                maxLength={256}
                spellCheck={false}
                defaultValue={me?.location?.display ?? ""}
                onChange={place => {
                  setFieldValue("location", normalizePlace(place))
                }}
              />

              <Input
                title="Profession"
                name="profession"
                value={values.profession}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                title="Other relevant positions"
                name="otherRelevantPositions"
                value={values.otherRelevantPositions}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Stack>

            <Button width="100%" disabled={!dirty} loading={isSubmitting}>
              Save and Continue
            </Button>
          </Stack>
        )
      }}
    </Formik>
  )
}

const CompleteProfileInformationDialogFormSkeleton: FC = () => {
  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <SkeletonText variant="xs">
          Complete your profile and make a great impression. Galleries are more
          likely to respond to collectors with complete profiles.
        </SkeletonText>

        <Input title="Full name" disabled />

        <Input title="Location" placeholder="Enter your city" disabled />

        <Input title="Profession" disabled />

        <Input title="Other relevant positions" disabled />
      </Stack>

      <Button width="100%" disabled />
    </Stack>
  )
}

interface CompleteProfileInformationDialogFormInput {
  name: string
  location: Location
  profession: string
  otherRelevantPositions: string
}

const QUERY = graphql`
  query CompleteProfileInformationDialogQuery {
    me {
      name
      otherRelevantPositions
      profession
      location {
        display
        city
        state
        country
      }
    }
  }
`
