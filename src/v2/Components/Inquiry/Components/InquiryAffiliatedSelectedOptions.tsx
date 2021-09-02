import { Box, Text } from "@artsy/palette"
import React from "react"
import { InquiryAffiliatedRemoveButton } from "./InquiryAffiliatedRemoveButton"

type Option = { text: string; value: string }

interface InquiryAffiliatedSelectedOptionsProps {
  selection: Option[]
  onRemove(option: Option): void
}

export const InquiryAffiliatedSelectedOptions: React.FC<InquiryAffiliatedSelectedOptionsProps> = ({
  selection,
  onRemove,
}) => {
  const handleClick = (option: Option) => () => {
    onRemove(option)
  }

  return (
    <Box minHeight={300} my={2}>
      {selection.map((option, i) => {
        return (
          <Text
            key={option.value}
            variant="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={2}
            {...(i === 0 ? { borderTop: "1px solid" } : {})}
            borderBottom="1px solid"
            borderColor="black10"
          >
            {option.text}

            <InquiryAffiliatedRemoveButton onClick={handleClick(option)} />
          </Text>
        )
      })}
    </Box>
  )
}
