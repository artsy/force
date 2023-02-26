import React from "react"
import { graphql } from "react-relay"
import { Formik, FormikHelpers } from "formik"
import createLogger from "Utils/logger"
import {
  Flex,
  Button,
  LabeledInput,
  ModalDialog,
  Spacer,
  EditIcon,
  Text,
} from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { Media } from "Utils/Responsive"
import { useTranslation } from "react-i18next"
import { useMutation } from "Utils/Hooks/useMutation"
import { CreateNewListModalMutation } from "__generated__/CreateNewListModalMutation.graphql"

export interface CreateNewListValues {
  name: string
}

interface CreateNewListModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
)

const MAX_NAME_LENGTH = 40

const CreateNewListModal: React.FC<CreateNewListModalProps> = ({
  onClose,
  onComplete,
}) => {
  const { t } = useTranslation()
  const { relayEnvironment } = useSystemContext()
  const { submitMutation } = useMutation<CreateNewListModalMutation>({
    mutation: graphql`
      mutation CreateNewListModalMutation($input: createCollectionInput!) {
        createCollection(input: $input) {
          responseOrError {
            __typename

            ... on CreateCollectionSuccess {
              collection {
                internalID
              }
            }

            ... on CreateCollectionFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })

  const handleSubmit = async (
    values: CreateNewListValues,
    helpers: FormikHelpers<CreateNewListValues>
  ) => {
    if (!relayEnvironment) {
      return null
    }

    try {
      await submitMutation({
        variables: { input: { name: values.name } },
        rejectIf: response => {
          const result = response.createCollection?.responseOrError

          if (result?.__typename === "CreateCollectionFailure") {
            return result.mutationError
          }

          return false
        },
      })

      onComplete()
    } catch (error) {
      logger.error(error)
      helpers.setFieldError(
        "name",
        error.message ?? t("collectorSaves.createNewListModal.genericError")
      )
    }
  }

  return (
    <Formik<CreateNewListValues>
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => {
        const isCreateButtonDisabled = !values.name

        return (
          <ModalDialog
            width={["100%", 713]}
            onClose={onClose}
            title={t("collectorSaves.createNewListModal.title")}
            data-testid="CreateNewList"
            footer={
              <>
                {/* Desktop view */}
                <Media greaterThanOrEqual="sm">
                  <Flex justifyContent="flex-end">
                    <Button
                      disabled={isCreateButtonDisabled}
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                    >
                      {t("collectorSaves.createNewListModal.createListButton")}
                    </Button>
                  </Flex>
                </Media>

                {/* Mobile view */}
                <Media lessThan="sm">
                  <Button
                    disabled={isCreateButtonDisabled}
                    loading={isSubmitting}
                    onClick={() => handleSubmit()}
                    width="100%"
                  >
                    {t("collectorSaves.createNewListModal.createListButton")}
                  </Button>

                  <Spacer y={1} />

                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    onClick={onClose}
                  >
                    {t("collectorSaves.createNewListModal.back")}
                  </Button>
                </Media>
              </>
            }
          >
            <LabeledInput
              title={t("collectorSaves.createNewListModal.nameLabel")}
              name="name"
              placeholder={t(
                "collectorSaves.createNewListModal.namePlaceholder"
              )}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              maxLength={MAX_NAME_LENGTH}
              label={
                <>
                  {/* Desktop view */}
                  <Media greaterThanOrEqual="sm">
                    <EditIcon />
                  </Media>
                </>
              }
            />
            <Spacer y={1} />
            <Text variant="xs">
              {t("collectorSaves.createNewListModal.remainingCharactersCount", {
                count: MAX_NAME_LENGTH - values.name.length,
              })}
            </Text>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const CreateNewListModalContainer: React.FC<CreateNewListModalProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <CreateNewListModal {...props} />
}
