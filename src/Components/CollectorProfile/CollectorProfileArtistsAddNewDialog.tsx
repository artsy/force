import { Button, Input, ModalDialog, Stack, useToasts } from "@artsy/palette"
import { FC } from "react"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { CollectorProfileArtistsAddNewDialogCreateArtistMutation } from "__generated__/CollectorProfileArtistsAddNewDialogCreateArtistMutation.graphql"
import { Form, Formik } from "formik"
import * as Yup from "yup"

interface CollectorProfileArtistsAddNewDialogProps {
  name: string
  onClose: () => void
  onAdd: (artistID: string) => void
}

export const CollectorProfileArtistsAddNewDialog: FC<CollectorProfileArtistsAddNewDialogProps> = ({
  name,
  onClose,
  onAdd,
}) => {
  const { submitMutation } = useMutation<
    CollectorProfileArtistsAddNewDialogCreateArtistMutation
  >({ mutation: MUTATION })

  const { sendToast } = useToasts()

  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        displayName: name,
        nationality: "",
        birthday: "",
        deathday: "",
        isPersonalArtist: true,
      }}
      onSubmit={async values => {
        try {
          const res = await submitMutation({
            variables: { input: values },
            rejectIf: res => {
              return res.createArtist?.artistOrError?.mutationError?.error
            },
          })

          const artistID = res.createArtist?.artistOrError?.artist?.internalID

          if (!artistID) {
            throw new Error("Failed to create artist")
          }

          onAdd(artistID)
          onClose()
        } catch (err) {
          console.error(err)

          sendToast({ variant: "error", message: err.message })
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        isValid,
        touched,
        values,
        submitForm,
      }) => {
        return (
          <ModalDialog
            title="Add new artist"
            onClose={onClose}
            footer={
              <Button
                width="100%"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Add artist
              </Button>
            }
          >
            <Form>
              <Stack gap={1}>
                <Input
                  title="Artist name"
                  required
                  name="displayName"
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.displayName && errors.displayName}
                  autoFocus
                />

                <Input
                  name="nationality"
                  title="Nationality"
                  value={values.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nationality && errors.nationality}
                />

                <Stack gap={2} flexDirection="row">
                  <Input
                    name="birthday"
                    title="Birth year"
                    value={values.birthday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.birthday && errors.birthday}
                  />

                  <Input
                    name="deathday"
                    title="Death year"
                    value={values.deathday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.deathday && errors.deathday}
                  />
                </Stack>
              </Stack>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

const VALIDATION_SCHEMA = Yup.object({
  displayName: Yup.string().required("Artist name is required"),
  nationality: Yup.string(),
  birthday: Yup.string(),
  deathday: Yup.string(),
  isPersonalArtist: Yup.boolean(),
})

const MUTATION = graphql`
  mutation CollectorProfileArtistsAddNewDialogCreateArtistMutation(
    $input: CreateArtistMutationInput!
  ) {
    createArtist(input: $input) {
      artistOrError {
        ... on CreateArtistSuccess {
          artist {
            internalID
          }
        }
        ... on CreateArtistFailure {
          mutationError {
            error
          }
        }
      }
    }
  }
`
