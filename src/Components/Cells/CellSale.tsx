import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { CellSale_sale$data } from "__generated__/CellSale_sale.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { FC } from "react"

export interface CellSaleProps extends Omit<RouterLinkProps, "to"> {
  sale: CellSale_sale$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const CellSale: FC<CellSaleProps> = ({ sale, mode = "RAIL", ...rest }) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = sale.coverImage?.cropped

  return (
    <RouterLink
      to={sale.href}
      display="block"
      textDecoration="none"
      width={width}
      {...rest}
    >
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        {image?.src ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            style={{ display: "block" }}
          />
        ) : (
          <Box
            bg="black10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
        )}
      </ResponsiveBox>

      <Spacer y={0.5} />

      <Text variant="sm-display">{sale.name}</Text>
      <Text variant="sm-display" color="black60">
        {sale.formattedStartDateTime}
      </Text>
    </RouterLink>
  )
}

export const CellSalePlaceholder: FC = () => {
  return (
    <Box width={DEFAULT_CELL_WIDTH}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <Spacer y={0.5} />

      <SkeletonText variant="sm-display">
        Impact: Artists in Support of Refugees from Ukraine
      </SkeletonText>
      <SkeletonText variant="sm-display">
        Ends Apr 14 at 12:00pm EDT
      </SkeletonText>
    </Box>
  )
}

export const CellSaleFragmentContainer = createFragmentContainer(CellSale, {
  sale: graphql`
    fragment CellSale_sale on Sale {
      name
      formattedStartDateTime
      href
      coverImage {
        cropped(width: 445, height: 334, version: ["larger", "large"]) {
          src
          srcSet
        }
      }
    }
  `,
})
