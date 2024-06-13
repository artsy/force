import {
  Box,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Input,
  LabeledInput,
  Option,
  Radio,
  RadioGroup,
  Select,
  Text,
  useToasts,
} from "@artsy/palette"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import {
  AcceptableCategoryValue,
  acceptableCategoriesForSubmission,
  formatCategoryValueForSubmission,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/acceptableCategoriesForSubmission"
import { ProvenanceModal } from "Apps/MyCollection/Routes/EditArtwork/Components/ProvenanceModal"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import {
  Location,
  LocationAutocompleteInput,
  Place,
  buildLocationDisplay,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { ArtworkDetails_myCollectionArtwork$data } from "__generated__/ArtworkDetails_myCollectionArtwork.graphql"
import { ArtworkDetails_submission$data } from "__generated__/ArtworkDetails_submission.graphql"
import { redirects_submission$data } from "__generated__/redirects_submission.graphql"
import { useFormikContext } from "formik"
import { useMemo, useState } from "react"
import { ArtistAutoComplete } from "./ArtistAutocomplete"

export enum SubmissionType {
  submission = "SUBMISSION",
  myCollectionArtwork = "MY_COLLECTION_ARTWORK",
  default = "DEFAULT",
}

export type getArtworkDetailsFormInitialValuesProps =
  | {
      values: ArtworkDetails_submission$data | redirects_submission$data
      type: SubmissionType.submission
    }
  | {
      values: ArtworkDetails_myCollectionArtwork$data
      type: SubmissionType.myCollectionArtwork
    }
  | {
      type: SubmissionType.default
    }

export const getArtworkDetailsFormInitialValues = (
  props: getArtworkDetailsFormInitialValuesProps
) => {
  switch (props.type) {
    case "SUBMISSION":
      return {
        artistId: props.values.artist?.internalID ?? "",
        artistName: props.values.artist?.name ?? "",
        category: props.values.category ?? null,
        year: props.values.year ?? "",
        title: props.values.title ?? "",
        materials: props.values.medium ?? "",
        rarity:
          props.values.attributionClass?.replace("_", " ").toLowerCase() ??
          null,
        editionNumber: props.values.editionNumber ?? "",
        editionSize: props.values.editionSize ?? undefined,
        height: props.values.height ?? "",
        width: props.values.width ?? "",
        depth: props.values.depth ?? "",
        units: props.values.dimensionsMetric ?? "in",
        provenance: props.values.provenance ?? "",
        location: {
          city: props.values.locationCity ?? "",
          country: props.values.locationCountry ?? undefined,
          state: props.values.locationState ?? undefined,
          countryCode: props.values.locationCountryCode ?? undefined,
        },
        postalCode: props.values.locationPostalCode ?? undefined,
      } as ArtworkDetailsFormModel

    case "MY_COLLECTION_ARTWORK":
      return {
        artistId: props.values.artist?.internalID ?? "",
        artistName: props.values.artist?.name ?? "",
        category: props.values.mediumType?.name
          ? formatCategoryValueForSubmission(props.values.mediumType.name)
          : null,
        year: props.values.date ?? "",
        title: props.values.title ?? "",
        materials: props.values.medium ?? "",
        rarity:
          props.values.attributionClass?.name
            ?.replace("_", " ")
            .toLowerCase() ?? "",
        editionNumber: props.values.editionNumber ?? "",
        editionSize: props.values.editionSize ?? undefined,
        height: props.values.height ?? "",
        width: props.values.width ?? "",
        depth: props.values.depth ?? "",
        units: props.values.metric ?? "in",
        provenance: props.values.provenance ?? "",
        location: props.values.collectorLocation ?? { city: "" },
        postalCode: undefined,
      } as ArtworkDetailsFormModel
    default:
      return {
        artistId: "",
        artistName: "",
        category: null,
        year: "",
        title: "",
        materials: "",
        rarity: "",
        editionNumber: "",
        editionSize: undefined,
        height: "",
        width: "",
        depth: "",
        units: "in",
        provenance: "",
        location: {
          city: "",
        },
        postalCode: undefined,
      }
  }
}

const rarityOptions = ATTRIBUTION_CLASS_OPTIONS.map(({ name, value }) => ({
  text: name,
  value,
}))

rarityOptions.unshift({ text: "Select a Сlassification", value: "" })

export interface ArtworkDetailsFormModel {
  artistName: string
  artistId: string
  category: AcceptableCategoryValue | null
  year: string
  title: string
  materials: string
  rarity: string | null
  editionNumber: string
  editionSize?: string
  height: string
  width: string
  depth: string
  units: string
  provenance: string
  location: Location
  postalCode?: string
}

export const ArtworkDetailsForm: React.FC = () => {
  const { sendToast } = useToasts()

  const isSellFlowRequiredField = useFeatureFlag(
    "onyx_sell-flow-required-fields"
  )

  const [isRarityModalOpen, setIsRarityModalOpen] = useState(false)
  const [isProvenanceModalOpen, setIsProvenanceModalOpen] = useState(false)

  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    setFieldTouched,
  } = useFormikContext<ArtworkDetailsFormModel>()

  const limitedEditionRarity = values.rarity === "limited edition"

  const handleAutosuggestError = (isError: boolean) => {
    if (isError) {
      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact sell@artsy.net",
      })

      return
    }

    setFieldValue("artistName", "")
    setFieldValue("artistId", "")
  }

  const handleLocationClose = () => setFieldTouched("location")
  const handleLocationClick = () => setFieldTouched("location", false)
  const handleLocationChange = () => {
    setFieldValue("postalCode", "")
    setFieldTouched("postalCode", false)

    setFieldValue("location", {})
    setFieldTouched("location", false)
  }
  const handleLocationSelect = (place?: Place) => {
    setFieldValue("location", normalizePlace(place, true))
  }

  const categories = useMemo(acceptableCategoriesForSubmission, [])

  return (
    <>
      <ArtworkSidebarClassificationsModalQueryRenderer
        onClose={() => setIsRarityModalOpen(false)}
        show={isRarityModalOpen}
        showDisclaimer={false}
      />
      <ProvenanceModal
        onClose={() => setIsProvenanceModalOpen(false)}
        show={isProvenanceModalOpen}
      />

      <GridColumns>
        <Column span={6}>
          <ArtistAutoComplete
            onSelect={artist => setFieldValue("artistId", artist?.internalID)}
            onError={() => handleAutosuggestError(true)}
            title="Artist"
            required
          />
        </Column>
        <Column span={6} mt={[4, 0]}>
          <Input
            title="Year"
            maxLength={256}
            placeholder="YYYY"
            name="year"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.year}
            error={touched.year && errors.year}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Input
            title="Title"
            placeholder="Add title or write 'Unknown'"
            name="title"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            required
            error={touched.title && errors.title}
          />
        </Column>
        <Column span={6} mt={[4, 0]}>
          <Select
            title="Medium"
            name="category"
            options={categories as Option[]}
            selected={values.category ?? undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => setFieldValue("category", selected)}
            required
            error={touched.category && errors.category}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Input
            title="Materials"
            placeholder="Add materials"
            name="materials"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.materials}
            error={touched.materials && errors.materials}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Flex justifyContent="flex-end">
            <Clickable
              onClick={() => setIsRarityModalOpen(true)}
              data-test-id="open-rarity-modal"
            >
              <Text variant="xs" color="black60">
                <u>What is this?</u>
              </Text>
            </Clickable>
          </Flex>
          <Select
            title="Rarity"
            name="rarity"
            options={rarityOptions}
            selected={values.rarity ?? undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => setFieldValue("rarity", selected)}
            error={touched.rarity && errors.rarity}
          />
        </Column>
        <Column display="flex" span={6}>
          {limitedEditionRarity && (
            <Flex
              flex={1}
              alignSelf="flex-end"
              alignItems="center"
              mt={[30, 0]}
              mb={[1, 0]}
            >
              <Input
                title="Edition Number"
                placeholder="Your work's #"
                name="editionNumber"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionNumber}
                error={touched.editionNumber && errors.editionNumber}
              />
              <Box px={[0.5, 2]} mt={2}>
                /
              </Box>
              <Input
                title="Edition Size"
                placeholder="Total # in edition"
                name="editionSize"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionSize}
                error={touched.editionSize && errors.editionSize}
              />
            </Flex>
          )}
        </Column>
      </GridColumns>
      <GridColumns mt={[30, 2]}>
        <Column span={6}>
          <Flex height="100%">
            <LabeledInput
              title="Height"
              width="50%"
              mr={2}
              maxLength={256}
              label={values.units}
              name="height"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.height}
              required={isSellFlowRequiredField ? false : true}
              error={touched.height && errors.height}
            />

            <LabeledInput
              title="Width"
              width="50%"
              maxLength={256}
              label={values.units}
              name="width"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.width}
              required={isSellFlowRequiredField ? false : true}
              error={touched.width && errors.width}
            />
          </Flex>
        </Column>
        <Column span={6} mt={[4, 0]}>
          <Flex height="100%">
            <LabeledInput
              title="Depth (Optional)"
              pr={[0, 1]}
              width="50%"
              maxLength={256}
              label={values.units}
              name="depth"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depth}
            />
            <RadioGroup
              width="50%"
              defaultValue={values.units}
              flexDirection="row"
              mt={2}
              ml={2}
              onSelect={selected => setFieldValue("units", selected)}
            >
              <Radio mr={4} value="in" label="in" selected />
              <Radio value="cm" label="cm" />
            </RadioGroup>
          </Flex>
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Flex justifyContent="flex-end">
            <Clickable
              onClick={() => setIsProvenanceModalOpen(true)}
              data-test-id="open-provenance-modal"
            >
              <Text variant="xs" color="black60">
                <u>What is this?</u>
              </Text>
            </Clickable>
          </Flex>

          <Input
            title="Provenance"
            name="provenance"
            placeholder="Describe how you acquired the work"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.provenance}
            error={touched.provenance && errors.provenance}
          />
        </Column>
        <Column display="flex" alignItems="flex-end" span={6} mt={[4, 0]}>
          <LocationAutocompleteInput
            flex={1}
            name="location"
            title="City"
            placeholder="Enter city where artwork is located"
            maxLength={256}
            spellCheck={false}
            defaultValue={buildLocationDisplay(values.location)}
            error={touched.location && errors.location?.city}
            onClose={handleLocationClose}
            onSelect={handleLocationSelect}
            onChange={handleLocationChange}
            onClick={handleLocationClick}
          />
        </Column>
      </GridColumns>
    </>
  )
}
