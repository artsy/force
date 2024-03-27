import {
  Button,
  Flex,
  Join,
  Link,
  ModalDialog,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { useTranslation } from "react-i18next"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { Formik, Form } from "formik"
import { EditArtworkListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditArtworkListItem"
import { useUpdateMeCollection } from "Apps/CollectorProfile/Routes/Saves/Components/Actions/Mutations/useUpdateMeCollection"
import createLogger from "Utils/logger"
import { UpdateMeCollectionInput } from "__generated__/useUpdateMeCollectionMutation.graphql"

interface EditListPrivacyModalProps {
  onClose: () => void
  me: CollectorProfileSavesRoute_me$data
}

export interface EditListPrivacyFormModel {
  [key: string]: boolean
}

interface EditListPrivacyFormikValues extends Array<EditListPrivacyFormModel> {}

const logger = createLogger("EditListPrivacyModal")

export const EditListPrivacyModal: React.FC<EditListPrivacyModalProps> = ({
  onClose,
  me,
}) => {
  const { t } = useTranslation()
  const customArtworkLists = extractNodes(me.customArtworkLists)
  const savedArtworksArtworkList = me?.savedArtworksArtworkList
  const artworkLists = savedArtworksArtworkList
    ? [savedArtworksArtworkList, ...customArtworkLists]
    : customArtworkLists
  const initialValues = artworkLists && getInitialValues(artworkLists)

  const { submitMutation } = useUpdateMeCollection()

  const { sendToast } = useToasts()

  const handleSubmit = async (formikValues: EditListPrivacyFormikValues) => {
    try {
      await submitMutation({
        variables: {
          input: {
            attributes: (Object.entries(formikValues).map(
              ([id, shareableWithPartners]) => ({
                id,
                shareableWithPartners,
              })
            ) as unknown) as UpdateMeCollectionInput[],
          },
        },
        rejectIf: res => {
          const result = res.updateMeCollectionsMutation?.meCollectionsOrErrors

          return result && result[0].mutationError
        },
      })

      sendToast({
        variant: "success",
        message: t("collectorSaves.editListPrivacyModal.success"),
      })

      onClose()
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <ModalDialog
      width={["100%", 600]}
      onClose={onClose}
      title={t("collectorSaves.editListPrivacyModal.title")}
      data-testid="CreateNewList"
    >
      <Formik<EditListPrivacyFormikValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <Text variant="xs">
              {t("collectorSaves.editListPrivacyModal.description")}{" "}
              <Link
                href="https://support.artsy.net/s/article/Offers-on-saved-works"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </Link>
            </Text>

            <Spacer y={2} />

            <Flex
              flexDirection="column"
              overflowY="scroll"
              height="320px"
              paddingTop={1}
            >
              <Join separator={<Spacer y={2} />}>
                {artworkLists.map(list => {
                  return (
                    <EditArtworkListItemFragmentContainer
                      key={list.internalID}
                      item={list}
                    />
                  )
                })}
              </Join>
            </Flex>

            <Spacer y={2} />

            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                loading={!!formik.isSubmitting}
                display="flex"
                width={["100%", "30%"]}
              >
                Save Changes
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </ModalDialog>
  )
}

const getInitialValues = artworkLists => {
  return artworkLists.reduce((acc, list) => {
    return {
      ...acc,
      [list.internalID]: list.shareableWithPartners,
    }
  }, {})
}
