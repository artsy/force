import React, { FC } from "react"
import {
  Box,
  Column,
  GridColumns,
  Input,
  Spacer,
  Text,
  Select,
  Flex,
  RadioGroup,
  Radio,
} from "@artsy/palette"
import { Form } from "formik"

const rarityOptions = [
  { text: "Unique", value: "Unique" },
  { text: "Limited Edition", value: "Limited Edition" },
  { text: "Open Edition", value: "Open Edition" },
  { text: "Unknown Edinion", value: "Open Edition" },
]

export const ArtworkDetailsForm: FC = () => {
  return (
    <Form>
      <GridColumns>
        <Column span={6}>
          <Input title="Artist" placeholder="Enter Full Name" name="artist" />
        </Column>
        <Column span={6}>
          <Input title="Year" placeholder="YYYY" name="Year" />
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <Input
            title="Title"
            placeholder="Add Title or Write “Unknown”"
            name="Title"
          />
        </Column>
        <Column span={6}>
          <Input
            title="Medium"
            placeholder="Painting, Print, Sculpture…"
            name="Medium"
          />
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <Text variant="xs" mb={0.5}>
            RARITY
          </Text>
          <Select
            placeholder="Unique, Limited Edition, Open Edition…"
            name="Rarity"
            options={rarityOptions}
          />
        </Column>
        <Column span={6}>
          <Flex alignItems="center">
            <Input
              title="Edition Number"
              placeholder="Your Work’s #"
              name="Edition Number"
            />
            <Box paddingX={2} mt={2}>
              /
            </Box>
            <Input
              title="Edition Size"
              placeholder="Total # in Edition"
              name="Edition Size"
            />
          </Flex>
        </Column>
      </GridColumns>
      <GridColumns mt={[2, 4]}>
        <Column span={6}>
          <Flex alignItems="center">
            <Input title="Height" placeholder="in" name="Height" />
            <Spacer mx={1} />
            <Input title="Width" placeholder="in" name="Width" />
          </Flex>
        </Column>
        <Column span={6}>
          <Flex alignItems="center">
            <Input
              title="Depth (Optional)"
              placeholder="in"
              name="Depth"
              width="50%"
            />
            <Spacer paddingX={2} />
            <RadioGroup
              width="50%"
              defaultValue="in"
              flexDirection="row"
              mt={2}
            >
              <Radio value="in" label="in" selected />
              <Spacer mx={2} />
              <Radio value="cm" label="cm" />
            </RadioGroup>
          </Flex>
        </Column>
      </GridColumns>
    </Form>
  )
}
