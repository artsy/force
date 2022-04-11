import { useState } from "react"
import {
  Box,
  Column,
  GridColumns,
  Input,
  Text,
  Select,
  Flex,
  RadioGroup,
  Radio,
  LabeledInput,
  Clickable,
  Modal,
  Button,
} from "@artsy/palette"
import { useFormikContext } from "formik"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtistAutoComplete } from "./ArtistAutocomplete"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { useErrorModal } from "../../Utils/useErrorModal"
import { ArtworkDetails_submission } from "v2/__generated__/ArtworkDetails_submission.graphql"
import {
  Location,
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "v2/Components/LocationAutocompleteInput"
import { compact } from "lodash"
import { postalCodeValidators } from "../../Utils/validation"

export const getArtworkDetailsFormInitialValues = (
  submission?: ArtworkDetails_submission
): ArtworkDetailsFormModel => ({
  artistId: submission?.artist?.internalID ?? "",
  artistName: submission?.artist?.name ?? "",
  year: submission?.year ?? "",
  title: submission?.title ?? "",
  materials: submission?.medium ?? "",
  rarity: submission?.attributionClass?.replace("_", " ").toLowerCase() ?? "",
  editionNumber: submission?.editionNumber ?? "",
  editionSize: submission?.editionSize ?? undefined,
  height: submission?.height ?? "",
  width: submission?.width ?? "",
  depth: submission?.depth ?? "",
  units: submission?.dimensionsMetric ?? "in",
  provenance: submission?.provenance ?? "",
  location: {
    city: submission?.locationCity ?? "",
    country: submission?.locationCountry ?? undefined,
    state: submission?.locationState ?? undefined,
    countryCode: submission?.locationCountryCode ?? undefined,
  },
  postalCode: submission?.locationPostalCode ?? undefined,
})

const rarityOptions = checkboxValues.map(({ name, value }) => ({
  text: name,
  value,
}))

rarityOptions.unshift({ text: "Select a Сlassification", value: "default" })

export interface ArtworkDetailsFormModel {
  artistName: string
  artistId: string
  year: string
  title: string
  materials: string
  rarity: string
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
  const { openErrorModal } = useErrorModal()

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
  const defaultLocation = compact([
    values.location.city,
    values.location.state,
    values.location.country,
  ]).join(", ")

  const handleAutosuggestError = (isError: boolean) => {
    if (isError) {
      openErrorModal()
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
    setFieldValue("location", normalizePlace(place))
  }

  const showPostalCode =
    values.location.countryCode &&
    Object.keys(postalCodeValidators).includes(
      values.location.countryCode?.toUpperCase()
    )

  return (
    <>
      <ArtworkSidebarClassificationsModalQueryRenderer
        onClose={() => setIsRarityModalOpen(false)}
        show={isRarityModalOpen}
        showDisclaimer={false}
      />
      <Modal
        onClose={() => setIsProvenanceModalOpen(false)}
        show={isProvenanceModalOpen}
        title="Artwork provenance"
        FixedButton={
          <Button onClick={() => setIsProvenanceModalOpen(false)} width="100%">
            OK
          </Button>
        }
      >
        <Text variant="md">
          Provenance is the documented history of an artwork’s ownership and
          authenticity.
        </Text>
        <Text variant="md" mt={2}>
          Please list any documentation you have that proves your artwork’s
          provenance, such as:
        </Text>
        <Text as="li" variant="md" mt={2}>
          Invoices from previous owners
        </Text>
        <Text as="li" variant="md" mt={1}>
          Certificates of authenticity
        </Text>
        <Text as="li" variant="md" mt={1}>
          Gallery exhibition catalogues
        </Text>
      </Modal>

      <GridColumns>
        <Column span={6}>
          <ArtistAutoComplete onError={() => handleAutosuggestError(true)} />
        </Column>
        <Column span={6} mt={[30, 0]}>
          <Input
            title="year"
            maxLength={256}
            placeholder="YYYY"
            name="year"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.year}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Input
            title="Title"
            placeholder="Add Title or Write 'Unknown'"
            name="title"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
          />
        </Column>
        <Column span={6} mt={[30, 0]}>
          <Input
            title="Materials"
            placeholder="Add Materials"
            name="materials"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.materials}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6}>
          <Flex justifyContent="space-between">
            <Text variant="xs" mb={0.5} textTransform="uppercase">
              Rarity
            </Text>
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
            name="rarity"
            options={rarityOptions}
            selected={values.rarity}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => setFieldValue("rarity", selected)}
          />
        </Column>
        <Column span={6}>
          {limitedEditionRarity && (
            <Flex alignItems="center" mt={[30, 0]} mb={[1, 0]}>
              <Input
                title="Edition Number"
                placeholder="Your Work's #"
                name="editionNumber"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionNumber}
              />
              <Box paddingX={[0.5, 2]} mt={2}>
                /
              </Box>
              <Input
                title="Edition Size"
                placeholder="Total # in Edition"
                name="editionSize"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionSize}
              />
            </Flex>
          )}
        </Column>
      </GridColumns>
      <GridColumns mt={[30, 2]}>
        <Column span={6}>
          <Flex height="100%">
            <Box width="50%" mr={2} height="100%">
              <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                Height
              </Text>
              <LabeledInput
                maxLength={256}
                label={values.units}
                name="height"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
              />
            </Box>
            <Box width="50%" height="100%">
              <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                Width
              </Text>
              <LabeledInput
                maxLength={256}
                label={values.units}
                name="width"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.width}
              />
            </Box>
          </Flex>
        </Column>
        <Column span={6} mt={[30, 0]}>
          <Flex height="100%">
            <Box pr={[0, 1]} width="50%" height="100%">
              <Flex>
                <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                  Depth
                </Text>
                <Text variant="xs" color="black60">
                  (Optional)
                </Text>
              </Flex>
              <LabeledInput
                maxLength={256}
                label={values.units}
                name="depth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.depth}
              />
            </Box>
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
          <Flex justifyContent="space-between">
            <Text variant="xs" mb={0.5} textTransform="uppercase">
              Provenance
            </Text>

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
            name="provenance"
            placeholder="Describe How You Acquired the Work"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.provenance}
          />
        </Column>
        <Column span={6} mt={[30, 0]}>
          <LocationAutocompleteInput
            name="location"
            title="City"
            placeholder="Enter City Where Artwork Is Located"
            maxLength={256}
            spellCheck={false}
            defaultValue={defaultLocation}
            error={touched.location && errors.location?.city}
            onClose={handleLocationClose}
            onSelect={handleLocationSelect}
            onChange={handleLocationChange}
            onClick={handleLocationClick}
          />
        </Column>
      </GridColumns>
      {showPostalCode && (
        <GridColumns mt={[4, 2]}>
          <Column start={7} span={6}>
            <Input
              title="Zip/postal code"
              placeholder="Zip/Postal Code Where Artwork Is Located"
              name="postalCode"
              maxLength={256}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.postalCode}
              error={touched.postalCode && errors.postalCode}
            />
          </Column>
        </GridColumns>
      )}
    </>
  )
}
