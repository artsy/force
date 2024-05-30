import {
  Box,
  Clickable,
  Column,
  EntityHeader,
  Flex,
  GridColumns,
  Input,
  LabeledInput,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { ArtistAutoComplete } from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtistAutocomplete"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { categoryOptions } from "Apps/MyCollection/Routes/EditArtwork/Utils/categoryOptions"
import { rarityOptions } from "Apps/MyCollection/Routes/EditArtwork/Utils/rarityOptions"
import {
  LocationAutocompleteInput,
  buildLocationDisplay,
  normalizePlace,
} from "Components/LocationAutocompleteInput"
import { NumericInput } from "Components/NumericInput"
import { useFormikContext } from "formik"
import { useState } from "react"
import { ProvenanceModal } from "./ProvenanceModal"

export const MyCollectionArtworkFormDetails: React.FC = () => {
  const { sendToast } = useToasts()

  const [isRarityModalOpen, setIsRarityModalOpen] = useState(false)
  const [isProvenanceModalOpen, setIsProvenanceModalOpen] = useState(false)

  const {
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleBlur,
  } = useFormikContext<ArtworkModel>()

  const isLimitedEdition = values.attributionClass === "LIMITED_EDITION"

  const handleAutosuggestError = (isError: boolean) => {
    if (isError) {
      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact support@artsymail.com",
      })

      return
    }

    setFieldValue("artistName", "")
    setFieldValue("artistId", "")
  }

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
        {values.artist ? (
          <Column span={12} mb={[0, 2]}>
            <EntityHeader
              name={values.artist.name || ""}
              meta={values.artist.formattedNationalityAndBirthday || ""}
              initials={values.artist.initials || ""}
              image={values.artist.image?.cropped || {}}
            />
          </Column>
        ) : (
          <Column span={6} mt={[2, 0]}>
            <ArtistAutoComplete
              onError={() => handleAutosuggestError(true)}
              onSelect={artist => {
                setFieldValue("artistId", artist?.internalID)
                setFieldValue("artistName", artist?.name || "")
                setFieldValue("artist", artist)
              }}
              required
              title="Artist"
            />
          </Column>
        )}

        <Column span={6} mt={[2, 0]}>
          <Input
            title="Title"
            placeholder="Title"
            name="title"
            required
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            data-testid="my-collection-artwork-details-title"
          />
        </Column>
        <Column span={6} mt={[2, 0]}>
          <Select
            title="Medium"
            required
            name="category"
            options={categoryOptions}
            selected={values.category}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => setFieldValue("category", selected)}
          />
        </Column>
        <Column span={6} mt={[2, 0]}>
          <Input
            title="Year"
            maxLength={256}
            placeholder="YYYY"
            name="date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.date}
          />
        </Column>

        <Column span={6} mt={[2, 0]}>
          <Input
            title="Materials"
            placeholder="Oil on Canvas, Mixed Media, Lithograph…"
            name="medium"
            maxLength={256}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.medium}
          />
        </Column>
      </GridColumns>

      <GridColumns mt={[4, 2]}>
        <Column span={6} mt={[2, 0]}>
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
            name="attributionClass"
            options={rarityOptions}
            selected={values.attributionClass}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => setFieldValue("attributionClass", selected)}
          />
        </Column>
        <Column display="flex" span={6} mt={[2, 0]}>
          {isLimitedEdition && (
            <Flex
              flex={1}
              alignSelf="flex-end"
              alignItems="center"
              mt={[30, 0]}
              mb={[1, 0]}
            >
              <NumericInput
                label=""
                title="Edition Number"
                placeholder="Your work's #"
                name="editionNumber"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionNumber}
                role="textbox"
              />
              <Box px={[0.5, 2]} mt={2}>
                /
              </Box>
              <NumericInput
                label=""
                title="Edition Size"
                placeholder="Total # in edition"
                name="editionSize"
                maxLength={256}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionSize}
                role="textbox"
              />
            </Flex>
          )}
        </Column>
      </GridColumns>
      <GridColumns mt={[30, 2]}>
        <Column span={6} mt={[2, 0]}>
          <Flex height="100%">
            <NumericInput
              width="50%"
              mr={2}
              title="Height"
              maxLength={256}
              label={values.metric}
              name="height"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.height}
              role="textbox"
              data-testid="my-collection-artwork-details-height"
            />
            <NumericInput
              title="Width"
              maxLength={256}
              label={values.metric}
              name="width"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.width}
              role="textbox"
              width="50%"
            />
          </Flex>
        </Column>
        <Column span={6} mt={[4, 0]}>
          <Flex height="100%">
            <NumericInput
              pr={[0, 1]}
              width="50%"
              title="Depth"
              maxLength={256}
              label={values.metric}
              name="depth"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depth}
              role="textbox"
            />
            <RadioGroup
              width="50%"
              defaultValue={values.metric}
              flexDirection="row"
              mt={2}
              ml={2}
              pt={0.5}
              alignContent="center"
              onSelect={selected => setFieldValue("metric", selected)}
            >
              <Radio mr={4} value="in" label="in" selected />
              <Radio value="cm" label="cm" />
            </RadioGroup>
          </Flex>
        </Column>
      </GridColumns>
      <GridColumns mt={[30, 2]}>
        <Column span={6} mt={[2, 0]}>
          <Flex height="100%">
            <LabeledInput
              width="100%"
              title="Price Paid"
              maxLength={256}
              label={values.pricePaidCurrency}
              name="pricePaidDollars"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pricePaidDollars}
            />
          </Flex>
        </Column>
        <Column span={6} mt={[4, 0]}>
          <Flex height="100%">
            <RadioGroup
              width="100%"
              defaultValue={values.pricePaidCurrency}
              flexDirection="row"
              mt={2}
              pt={0.5}
              onSelect={selected =>
                setFieldValue("pricePaidCurrency", selected)
              }
            >
              <Radio mr={4} value="USD" label="$&nbsp;USD" selected />
              <Radio mr={4} value="EUR" label="€&nbsp;EUR" />
              <Radio mr={4} value="GBP" label="£&nbsp;GBP" />
            </RadioGroup>
          </Flex>
        </Column>
      </GridColumns>
      <GridColumns mt={[4, 2]}>
        <Column span={6} mt={[2, 0]}>
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
            maxLength={500}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.provenance}
          />
        </Column>
        <Column alignItems="flex-end" display="flex" span={6} mt={[4, 0]}>
          <LocationAutocompleteInput
            name="collectorLocation"
            title="City"
            placeholder="Enter city where artwork is located"
            maxLength={256}
            spellCheck={false}
            defaultValue={buildLocationDisplay(values.collectorLocation)}
            onClick={() => setFieldTouched("location", false)}
            onClose={() => setFieldTouched("location")}
            onSelect={place => {
              setFieldValue("collectorLocation", normalizePlace(place))
            }}
            onChange={place => {
              setFieldValue("collectorLocation", normalizePlace(place))
            }}
          />
        </Column>
      </GridColumns>

      <GridColumns mt={4} mb={[0, 2]}>
        <Column span={12}>
          <TextArea
            title="Notes"
            name="confidentialNotes"
            maxLength={500}
            onBlur={handleBlur}
            onChange={({ value }) => {
              setFieldValue("confidentialNotes", value)
            }}
            value={values.confidentialNotes}
          />
        </Column>
      </GridColumns>
    </>
  )
}
