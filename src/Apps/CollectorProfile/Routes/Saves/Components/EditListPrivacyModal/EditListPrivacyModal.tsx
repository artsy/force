import { Button, ModalDialog } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { useTranslation } from "react-i18next"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { Formik, Form } from "formik"
import { EditArtworkListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditArtworkListItem"

interface EditListPrivacyModalProps {
  onClose: () => void
  onComplete: () => void
  me: CollectorProfileSavesRoute_me$data
}

export const EditListPrivacyModal: React.FC<EditListPrivacyModalProps> = ({
  onClose,
  onComplete,
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
    console.log(values)
  }

  return (
    <ModalDialog
      width={["100%", 713]}
      onClose={onClose}
      title={t("collectorSaves.editListPrivacyModal.title")}
      data-testid="CreateNewList"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            {artworkLists.map(list => {
              return (
                <EditArtworkListItemFragmentContainer
                  key={list.internalID}
                  item={list}
                />
              )
            })}
            <Button type="submit" onClick={onComplete}>
              Save Changes
            </Button>
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
