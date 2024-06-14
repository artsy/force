import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { CellShow_show$data } from "__generated__/CellShow_show.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import { useEventTiming } from "Utils/Hooks/useEventTiming"

export interface CellShowProps extends Omit<RouterLinkProps, "to"> {
  show: CellShow_show$data
  displayKind?: boolean
  displayStatus?: boolean
  displayPartner?: boolean
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const CellShow: FC<CellShowProps> = ({
  show,
  displayKind = false,
  displayStatus = false,
  displayPartner = true,
  mode = "RAIL",
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = show.coverImage?.cropped
  const kind = show.isFairBooth ? "Fair Booth" : "Show"

  return (
    <RouterLink
      to={show.href}
      display="block"
      textDecoration="none"
      style={{ cursor: show.href ? "pointer" : "default" }}
      width={width}
      {...rest}
    >
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        {image?.src && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            style={{ display: "block" }}
          />
        )}
      </ResponsiveBox>

      <Box mt={1} mr={1}>
        {displayKind && <Text variant="xs">{kind}</Text>}

        <Text variant="lg-display" lineClamp={2}>
          {show.name}
        </Text>

        {displayPartner && show.partner && (
          <Text variant="sm" lineClamp={1}>
            {show.partner.name}
          </Text>
        )}

        <Text variant="sm" color="black60">
          {show.exhibitionPeriod}

          {displayStatus && show.startAt && show.endAt && (
            <CellShowStatus startAt={show.startAt} endAt={show.endAt} />
          )}
        </Text>
      </Box>
    </RouterLink>
  )
}

type CellShowPlaceholderProps = Pick<CellShowProps, "mode" | "displayKind">

export const CellShowPlaceholder: FC<CellShowPlaceholderProps> = ({
  mode = "RAIL",
  displayKind = false,
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width}>
      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>

      <Box mt={1} mr={1}>
        {displayKind && <SkeletonText variant="xs">Show</SkeletonText>}

        <SkeletonText variant="lg-display" lineClamp={2}>
          Example Exhibition Title
        </SkeletonText>

        <SkeletonText variant="sm" lineClamp={1}>
          Example Partner
        </SkeletonText>

        <SkeletonText variant="sm" lineClamp={1}>
          Jan 0 - Jan 0, 0000
        </SkeletonText>
      </Box>
    </Box>
  )
}

interface CellShowStatusProps {
  startAt: string
  endAt: string
}

export const CellShowStatus: FC<CellShowStatusProps> = ({ startAt, endAt }) => {
  const { formattedTime: status } = useEventTiming({
    currentTime: useCurrentTime({ syncWithServer: true }),
    startAt,
    endAt,
  })

  if (!status) return null

  return <> — {status}</>
}

export const CellShowFragmentContainer = createFragmentContainer(CellShow, {
  show: graphql`
    fragment CellShow_show on Show {
      internalID
      slug
      name
      href
      startAt
      endAt
      isFairBooth
      exhibitionPeriod
      partner {
        ... on Partner {
          name
        }
      }
      coverImage {
        cropped(width: 445, height: 334, version: ["larger", "large"]) {
          src
          srcSet
        }
      }
    }
  `,
})
