import {
  Box,
  Text,
  Flex,
  CloseIcon,
  Clickable,
  Button,
  Spacer,
} from "@artsy/palette"
import { Formik } from "formik"
import { EditFormProps } from "../types"
import { SavedSearchAlertEditQueryRenderer } from "./SavedSearchEditAlert"

export const SavedSearchEditFormDesktop: React.FC<EditFormProps> = ({
  initialValues,
  editAlertEntity,
  onSubmit,
  onCloseClick,
  onDeleteClick,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Flex height="100%">
          <Box width="1px" height="100%" backgroundColor="black15" />
          <Box p={4} flex={1}>
            <Flex justifyContent="space-between">
              <Text variant="lg" flex={1} mr={1}>
                {editAlertEntity.name}
              </Text>
              <Clickable onClick={onCloseClick} mt={0.5}>
                <CloseIcon />
              </Clickable>
            </Flex>

            <Spacer mt={6} />

            <SavedSearchAlertEditQueryRenderer
              id={editAlertEntity.id}
              artistId={editAlertEntity.artistId}
            />

            <Spacer mt={6} />

            <Flex>
              <Button
                variant="secondaryOutline"
                flex={1}
                onClick={onDeleteClick}
              >
                Delete Alert
              </Button>
              <Spacer ml={2} />
              <Button
                flex={1}
                loading={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Save Alert
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Formik>
  )
}
