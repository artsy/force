import { BorderedRadio, Box, RadioGroup, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { useSystemContext } from "System"
import { isArtsyEmail } from "Utils/isArtsyEmail"
import { SavedSearchFrequency } from "../types"

interface FrequenceRadioButtonsProps {
  defaultFrequence: SavedSearchFrequency
  onSelect: (selectedOption: string) => void
}

export const FrequenceRadioButtons: React.FC<FrequenceRadioButtonsProps> = ({
  defaultFrequence,
  onSelect,
}) => {
  const { user } = useSystemContext()
  const isArtsyEmployee = isArtsyEmail(user?.email ?? "")

  if (isArtsyEmployee) {
    return (
      <Box>
        <Text variant="sm-display" mb={1}>
          Frequency
        </Text>
        <RadioGroup defaultValue={defaultFrequence} onSelect={onSelect}>
          <BorderedRadio
            value="instant"
            label={
              <Text>
                Instant <Warning>(experimental feature)</Warning>
              </Text>
            }
          >
            <Text color="black60">
              Frequency of sending notifications ~ 1 time per hour
            </Text>
          </BorderedRadio>
          <BorderedRadio value="daily" label="Daily" />
        </RadioGroup>
      </Box>
    )
  }

  return null
}

const Warning = styled.span`
  color: ${themeGet("colors.red100")};
`
