import * as Yup from "yup"
import i18n from "System/i18n/i18n"

export interface ArtworkListFormikValues {
  name: string
}

export const MAX_NAME_LENGTH = 40

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t("collectorSaves.editListModal.fields.name.required"))
    .max(MAX_NAME_LENGTH),
})
