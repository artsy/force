import { BorderedRadio, Box, RadioGroup, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { useSystemContext } from "System/useSystemContext"
import { userIsTeam } from "Utils/user"
import { SavedSearchFrequency } from "Components/SavedSearchAlert/types"

interface FrequenceRadioButtonsProps {
  defaultFrequence: SavedSearchFrequency
  onSelect: (selectedOption: string) => void
}

export const FrequenceRadioButtons: React.FC<FrequenceRadioButtonsProps> = ({
  defaultFrequence,
  onSelect,
}) => {
  const { user } = useSystemContext()
  const isArtsyEmployee = userIsTeam(user)

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
                Instant <Warning>(beta / internal only)</Warning>
              </Text>
            }
          >
            <Text color="black60">Max 1 notification per hour</Text>
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
