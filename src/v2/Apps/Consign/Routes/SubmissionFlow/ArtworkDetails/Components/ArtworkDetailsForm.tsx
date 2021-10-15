import React, { FC, useEffect } from "react"
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
  InfoCircleIcon,
} from "@artsy/palette"
import { useFormikContext } from "formik"
import { hardcodedMediums } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtistAutosuggest } from "./ArtistAutosuggest"
import { useRouter } from "v2/System/Router/useRouter"

const rarityOptions = checkboxValues.map(({ name, value }) => ({
  text: name,
  value,
}))

rarityOptions.unshift({
  text: "Unique, Limited Edition, Open Edition…",
  value: "default",
})

const mediumOptions = [
  { text: "Painting", value: "PAINTING" },
  { text: "Sculpture", value: "SCULPTURE" },
  { text: "Photography", value: "PHOTOGRAPHY" },
  { text: "Print", value: "PRINT" },
  {
    text: "Drawing, Collage or other Work on Paper",
    value: "DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER",
  },
  { text: "Mixed Media", value: "MIXED_MEDIA" },
  { text: "Performance Art", value: "PERFORMANCE_ART" },
  { text: "Installation", value: "INSTALLATION" },
  { text: "Video/Film/Animation", value: "VIDEO_FILM_ANIMATION" },
  { text: "Architecture", value: "ARCHITECTURE" },
  {
    text: "Fashion Design and Wearable Art",
    value: "FASHION_DESIGN_AND_WEARABLE_ART",
  },
  { text: "Jewelry", value: "JEWELRY" },
  { text: "Design/Decorative Art", value: "DESIGN_DECORATIVE_ART" },
  { text: "Textile Arts", value: "TEXTILE_ARTS" },
  { text: "Other", value: "OTHER" },
]

mediumOptions.unshift({ text: "Painting, Print, Sculpture…", value: "default" })

export interface ArtworkDetailsFormModel {
  artistName: string
  artistId: string
  year: string
  title: string
  medium: string
  rarity: string
  editionNumber: string
  editionSize?: number
  height: string
  width: string
  depth: string
  units: string
}

export const ArtworkDetailsForm: FC = () => {
  const {
    match: {
      params: { id },
    },
  } = useRouter()

  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    setValues,
  } = useFormikContext<ArtworkDetailsFormModel>()

  const limitedEditionRarity = values.rarity === "limited edition"

  useEffect(() => {
    if (id) {
      const formValues = sessionStorage.getItem(`submission-${id}`)
      formValues && setValues(JSON.parse(formValues).artworkDetailsForm, true)
    }
  }, [])

  return (
    <>
      <GridColumns>
        <Column span={6}>
          <ArtistAutosuggest />
        </Column>
        <Column span={6} mt={[2, 0]}>
          <Input
            title="year"
            placeholder="YYYY"
            name="year"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.year}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[1, 2]}>
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
        <Column span={6} mt={[1, 0]}>
          <Text variant="xs" mb={0.5} textTransform="uppercase">
            Medium
          </Text>
          <Select
            name="medium"
            options={mediumOptions}
            selected={values.medium}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => {
              setFieldValue("medium", selected)
            }}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[1, 2]}>
        <Column span={6}>
          <Flex justifyContent="space-between">
            <Text variant="xs" mb={0.5} textTransform="uppercase">
              Rarity
            </Text>
            <InfoCircleIcon />
          </Flex>
          <Select
            name="rarity"
            options={rarityOptions}
            selected={values.rarity}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => {
              setFieldValue("rarity", selected)
            }}
          />
        </Column>
        <Column span={6}>
          {limitedEditionRarity && (
            <Flex alignItems="center" mt={[1, 0]}>
              <Input
                title="Edition Number"
                placeholder="Your Work's #"
                name="editionNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionNumber}
              />
              <Box paddingX={[0.5, 2]} mt={2}>
                /
              </Box>
              <Input
                type="number"
                title="Edition Size"
                placeholder="Total # in Edition"
                name="editionSize"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionSize}
              />
            </Flex>
          )}
        </Column>
      </GridColumns>
      <GridColumns mt={[1, 2]}>
        <Column span={6}>
          <Flex height="100%">
            <Box width="50%" mr={2} height="100%">
              <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                Height
              </Text>
              <LabeledInput
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
                label={values.units}
                name="width"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.width}
              />
            </Box>
          </Flex>
        </Column>
        <Column span={6} mt={[1, 0]}>
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
              onSelect={selected => {
                setFieldValue("units", selected)
              }}
            >
              <Radio mr={4} value="in" label="in" selected />
              <Radio value="cm" label="cm" />
            </RadioGroup>
          </Flex>
        </Column>
      </GridColumns>
    </>
  )
}
