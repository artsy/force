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

interface Props {
  visible: boolean
  onClose: () => void
  onComplete: (result: CreateCollectionMutationResult) => void
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
)

const CreateNewListModal: React.FC<Props> = ({
  visible,
  onClose,
  onComplete,
}) => {
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
        setFormFieldError(error ?? "Something went wrong")
      }
    } catch (error) {
      logger.error(error)
      setFormFieldError("Something went wrong")
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
        setFieldValue,
      }) => {
        const isCreateButtonDisabled = !values.name

        return (
          <ModalDialog
            width={["100%", 713]}
            onClose={onClose}
            title="Create a new list"
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
                      Create List
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
                    Create List
                  </Button>

                  <Spacer y={1} />

                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    onClick={onClose}
                  >
                    Back
                  </Button>
                </Media>
              </>
            }
          >
            <LabeledInput
              title="Name your list"
              name="name"
              placeholder="E.g. Photography, Warhol, etc."
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
            <Text variant="xs">{remainingCharacters} characters remaining</Text>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const CreateNewListModalContainer: React.FC<Props> = ({
  visible,
  onClose,
  onComplete,
}) => {
  if (visible) {
    return (
      <CreateNewListModal
        visible={visible}
        onClose={onClose}
        onComplete={onComplete}
      />
    )
  }

  return null
}
