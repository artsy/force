import React, { useState } from "react"
import { Formik } from "formik"
import { createCollection } from "Apps/CollectorProfile/Routes/Saves2/Mutations/createCollection"
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
import { useSystemContext } from "System"
import {
  CreateNewListValues,
  CreateCollectionMutationResult,
} from "Apps/CollectorProfile/Routes/Saves2/types"
import { Media } from "Utils/Responsive"
import { useTranslation } from "react-i18next"

interface CreateNewListModalProps {
  visible: boolean
  onClose: () => void
  onComplete: (result: CreateCollectionMutationResult) => void
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
)

const CreateNewListModal: React.FC<CreateNewListModalProps> = ({
  onClose,
  onComplete,
}) => {
  const { t } = useTranslation()
  const maxNameLength = 40
  const { relayEnvironment } = useSystemContext()
  const [formFieldError, setFormFieldError] = useState("")
  const [remainingCharacters, setRemainingCharacters] = useState(maxNameLength)

  const handleSubmit = async (values: CreateNewListValues) => {
    if (!relayEnvironment) {
      return null
    }

    const params: CreateNewListValues = {
      name: values.name,
    }

    try {
      const response = await createCollection(relayEnvironment, params)
      const responseOrError = response.createCollection?.responseOrError

      if (responseOrError?.collection) {
        onComplete({ id: responseOrError?.collection?.internalID })
      } else {
        const error = (
          responseOrError?.mutationError?.message ?? ""
        ).toLowerCase()
        setFormFieldError(
          error ?? t("collectorSaves.createNewListModal.genericError")
        )
      }
    } catch (error) {
      logger.error(error)
      setFormFieldError(t("collectorSaves.createNewListModal.genericError"))
    }
  }

  return (
    <Formik<CreateNewListValues>
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => {
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
                      {t("collectorSaves.createNewListModal.createList")}
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
                    {t("collectorSaves.createNewListModal.createList")}
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
              onChange={e => {
                handleChange("name")(e)
                setRemainingCharacters(
                  Math.max(maxNameLength - e.target.value.length, 0)
                )
                setFormFieldError("")
              }}
              onBlur={handleBlur("name")}
              error={formFieldError}
              maxLength={maxNameLength}
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
              {t("collectorSaves.createNewListModal.remainingCharacters", {
                count: remainingCharacters,
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

  if (visible) {
    return <CreateNewListModal {...props} />
  }

  return null
}
