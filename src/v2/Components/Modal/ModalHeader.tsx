import {
  ArtsyLogoBlackIcon,
  Flex,
  Serif,
  Text,
  useThemeConfig,
} from "@artsy/palette"
import * as React from "react"

export const ModalHeader: React.FC<{
  title?: string
  hasLogo?: boolean
}> = ({ hasLogo, title }) => {
  const version = useThemeConfig({ v2: "v2", v3: "v3" })

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      {hasLogo && <ArtsyLogoBlackIcon mb={1} />}

      {title &&
        (version === "v2" ? (
          <Serif size="5" weight="semibold" mb={1}>
            {title}
          </Serif>
        ) : (
          <Text variant="lg" my={2}>
            {title}
          </Text>
        ))}
    </Flex>
  )
}
