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
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"
import { CellSale_sale } from "v2/__generated__/CellSale_sale.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { FC } from "react"

export interface CellSaleProps extends Omit<RouterLinkProps, "to"> {
  sale: CellSale_sale
}

const CellSale: FC<CellSaleProps> = ({ sale, ...rest }) => {
  const image = sale.coverImage?.cropped

  return (
    <RouterLink
      to={sale.href}
      display="block"
      textDecoration="none"
      width={DEFAULT_CELL_WIDTH}
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

      <Spacer my={0.5} />

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

      <Spacer my={0.5} />

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
        cropped(
          width: 445
          height: 334
          version: ["normalized", "larger", "large"]
        ) {
          src
          srcSet
        }
      }
    }
  `,
})
