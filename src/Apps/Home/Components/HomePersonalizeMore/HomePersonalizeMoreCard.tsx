import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import {
  Box,
  type BoxProps,
  Button,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import type { FC } from "react"

interface HomePersonalizeMoreCardProps extends BoxProps {
  src: string
  title: string
  subtitle: string
  label: string
  href: string
}

export const HomePersonalizeMoreCard: FC<
  React.PropsWithChildren<HomePersonalizeMoreCardProps>
> = ({ src, title, subtitle, label, href, ...rest }) => {
  const image = cropped(src, { width: 880, height: 400 })

  return (
    <Flex bg="mono100" flexDirection="column" {...rest}>
      <ResponsiveBox
        aspectWidth={11}
        aspectHeight={5}
        maxWidth="100%"
        bg="mono10"
      >
        <Image {...image} width="100%" height="100%" lazyLoad alt="" />
      </ResponsiveBox>

      <Flex
        color="mono0"
        p={2}
        flexDirection="column"
        justifyContent="space-between"
        flex={1}
      >
        <Box>
          <Text variant="lg-display">{title}</Text>

          <Spacer y={1} />

          <Text variant="sm">{subtitle}</Text>

          <Spacer y={2} />
        </Box>

        <Box>
          <Button
            size={["small", "small", "large"]}
            variant="primaryWhite"
            // @ts-expect-error
            as={RouterLink}
            to={href}
          >
            {label}
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
