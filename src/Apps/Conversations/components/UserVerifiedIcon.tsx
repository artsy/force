import { Box, Flex } from "@artsy/palette"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import PersonIcon from "@artsy/icons/PersonIcon"

/**
 * This Icon is a workaround because @artsy/icons doesn't support Icons with
 * multiple colors. Once it supports we should use the icon from there.
 */

interface Props {
  variant?: string
}

export const UserVerifiedIcon: React.FC<Props> = ({ variant = "sm" }) => {
  switch (variant) {
    case "md":
      return (
        <Flex
          position="relative"
          size={18}
          justifyContent="center"
          alignItems="center"
          data-testid="user-verified-icon"
        >
          <PersonIcon size={18} />
          <Box
            backgroundColor="white100"
            position="absolute"
            size={6}
            borderRadius="50%"
            style={{ bottom: 0, left: 10 }}
          />
          <CheckmarkFillIcon
            color="green100"
            position="absolute"
            size={10}
            style={{ bottom: 0, left: 10 }}
          />
        </Flex>
      )
    case "sm":
      return (
        //variant "sm"
        <Flex
          position="relative"
          size={18}
          justifyContent="center"
          alignItems="center"
          data-testid="user-verified-icon"
        >
          <PersonIcon height={12} width={14} />
          <Box
            backgroundColor="white100"
            position="absolute"
            size={6}
            borderRadius="50%"
            style={{ bottom: 3, right: 2 }}
          />
          <CheckmarkFillIcon
            color="green100"
            position="absolute"
            size={8}
            style={{ bottom: 2, right: 1 }}
          />
        </Flex>
      )
    default:
      return null
  }
}
