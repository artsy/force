import React, { FC } from "react"
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

const rarityOptions = checkboxValues.map(({ name, value }) => ({
  text: name,
  value,
}))

rarityOptions.unshift({
  text: "Unique, Limited Edition, Open Edition…",
  value: "default",
})

const mediumOptions = hardcodedMediums.map(({ name, value }) => ({
  text: name,
  value,
}))

mediumOptions.unshift({ text: "Painting, Print, Sculpture…", value: "default" })

export interface ArtworkDetailsFormModel {
  artist: string
  year: string
  title: string
  medium: string
  rarity: string
  editionNumber: string
  editionSize: string
  height: string
  width: string
  depth: string
  units: string
}

export const ArtworkDetailsForm: FC = () => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = useFormikContext<ArtworkDetailsFormModel>()
  const uniqueRarity = values.rarity === "unique"

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
            maxLength={4}
            error={touched.year && errors.year}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.year || ""}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <Input
            title="Title"
            placeholder="Add Title or Write 'Unknown'"
            name="title"
            maxLength={256}
            error={touched.title && errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title || ""}
          />
        </Column>
        <Column span={6} mt={[2, 0]}>
          <Text variant="xs" mb={0.5} textTransform="uppercase">
            Medium
          </Text>
          <Select
            name="medium"
            options={mediumOptions}
            selected={values.medium}
            error={touched.medium && errors.medium}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => {
              setFieldValue("medium", selected)
            }}
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
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
            error={touched.rarity && errors.rarity}
            onBlur={handleBlur}
            onChange={handleChange}
            onSelect={selected => {
              setFieldValue("rarity", selected)
            }}
          />
        </Column>
        <Column span={6}>
          {!uniqueRarity && (
            <Flex alignItems="center" mt={[2, 0]}>
              <Input
                title="Edition Number"
                placeholder="Your Work's #"
                name="editionNumber"
                error={touched.editionNumber && errors.editionNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionNumber || ""}
              />
              <Box paddingX={[0.5, 2]} mt={2}>
                /
              </Box>
              <Input
                title="Edition Size"
                placeholder="Total # in Edition"
                name="editionSize"
                error={touched.editionSize && errors.editionSize}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.editionSize || ""}
              />
            </Flex>
          )}
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <Flex alignItems="center">
            <Box width="50%" mr={2}>
              <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                Height
              </Text>
              <LabeledInput
                label={values.units}
                name="height"
                error={touched.height && errors.height}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Box>
            <Box width="50%">
              <Text variant="xs" mb={0.5} mr={0.5} textTransform="uppercase">
                Width
              </Text>
              <LabeledInput
                label={values.units}
                name="width"
                error={touched.width && errors.width}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Box>
          </Flex>
        </Column>
        <Column span={6} mt={[2, 0]}>
          <Flex alignItems="center">
            <Box pr={[0, 1]} width="50%">
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
                error={touched.depth && errors.depth}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.depth || ""}
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
