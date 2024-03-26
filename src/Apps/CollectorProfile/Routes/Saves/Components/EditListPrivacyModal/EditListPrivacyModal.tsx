import { Button, Flex, Join, ModalDialog, Spacer, Text } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { useTranslation } from "react-i18next"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { Formik, Form } from "formik"
import { EditArtworkListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditArtworkListItem"

interface EditListPrivacyModalProps {
  onClose: () => void
  me: CollectorProfileSavesRoute_me$data
}

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

  const handleSubmit = async (values: any) => {
    // handle submit
    console.log("handle submit", values)
  }

  return (
    <ModalDialog
      width={["100%", 600]}
      onClose={onClose}
      title={t("collectorSaves.editListPrivacyModal.title")}
      data-testid="CreateNewList"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Text variant="xs">
              Share your interest in artworks with their respective galleries.
              Switching lists to private will make them visible only to you and
              opt them out of offers. Learn more
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
                onClick={onClose}
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

const getInitialValues = (artworkLists: any[]) => {
  return artworkLists.reduce((acc, list) => {
    return {
      ...acc,
      [list.internalID]: list.shareableWithPartners,
    }
  }, {})
}
