import { ResponsiveBox, Image, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { FC } from "react"

interface MarketingCollectionCellProps {
  title: string
  href: string
  src: string
}

export const MarketingCollectionCell: FC<MarketingCollectionCellProps> = ({
  title,
  href,
  src,
}) => {
  const image = cropped(src, { width: 400, height: 300 })

  return (
    <RouterLink display="block" textDecoration="none" to={href}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <Image
          {...image}
          width="100%"
          height="100%"
          style={{ display: "block" }}
          alt=""
          lazyLoad
        />
      </ResponsiveBox>

      <Spacer y={0.5} />

      <Text variant="lg-display">{title}</Text>
    </RouterLink>
  )
}
