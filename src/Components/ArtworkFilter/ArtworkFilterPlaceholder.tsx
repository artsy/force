import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import ExpandIcon from "@artsy/icons/ExpandIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import SortIcon from "@artsy/icons/SortIcon"
import {
  Box,
  type BoxProps,
  Button,
  Dropdown,
  Flex,
  FullBleed,
  HorizontalOverflow,
  Pill,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkFilterActiveFilters } from "Components/ArtworkFilter/ArtworkFilterActiveFilters"
import {
  type ArtworkGridLayout,
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { Sticky } from "Components/Sticky"
import { Media } from "Utils/Responsive"

interface ArtworkFilterPlaceholderProps extends BoxProps {
  showCreateAlert?: boolean
  layout?: ArtworkGridLayout
}

export const ArtworkFilterPlaceholder: React.FC<
  React.PropsWithChildren<ArtworkFilterPlaceholderProps>
> = ({ showCreateAlert = false, layout = "MASONRY", ...rest }) => {
  const enableImmersiveView = useFlag("onyx_enable-immersive-view")

  return (
    <Skeleton {...rest}>
      {/* Mobile Artwork Filter Placeholder */}
      <Media at="xs">
        <Sticky>
          <FullBleed backgroundColor="mono0">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={2}
              gap={2}
              borderBottom="1px solid"
              borderColor="mono10"
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <FilterIcon />

                <SkeletonText variant="xs">Sort & Filter</SkeletonText>
              </Box>

              {showCreateAlert && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <BellStrokeIcon />

                  <SkeletonText variant="xs">Create Alert</SkeletonText>
                </Box>
              )}
            </Flex>
          </FullBleed>
        </Sticky>

        <Spacer y={4} />

        <SkeletonText variant="sm" fontWeight="bold">
          100
        </SkeletonText>

        <Spacer y={2} />

        <ArtworkGridPlaceholder columnCount={2} layout={layout} />
      </Media>

      {/* Desktop Artwork Filter Placeholder */}
      <Media greaterThan="xs">
        {/* Negative offset for positive sticky padding */}
        <Spacer y={-1} />

        <Sticky bottomBoundary="#Sticky__ArtworkFilter">
          {({ stuck }) => {
            return (
              <FullBleed backgroundColor="mono0">
                <AppContainer>
                  <HorizontalPadding>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                      py={1}
                      bg="mono0"
                    >
                      <HorizontalOverflow minWidth={0}>
                        <Flex gap={1}>
                          {showCreateAlert && (
                            <Flex gap={2}>
                              <Button
                                variant="secondaryBlack"
                                size="small"
                                Icon={BellStrokeIcon}
                                disabled
                              >
                                Create Alert
                              </Button>

                              <Box width="1px" bg="mono30" />

                              <Pill Icon={FilterIcon} size="small" disabled>
                                All Filters
                              </Pill>
                            </Flex>
                          )}
                          <Flex gap={1}>
                            {!showCreateAlert && (
                              <Pill Icon={FilterIcon} size="small" disabled>
                                All Filters
                              </Pill>
                            )}
                            <Pill
                              Icon={ChevronDownIcon}
                              size="small"
                              iconPosition="right"
                              disabled
                            >
                              Rarity
                            </Pill>

                            <Pill
                              Icon={ChevronDownIcon}
                              size="small"
                              iconPosition="right"
                              disabled
                            >
                              Medium
                            </Pill>

                            <Pill
                              Icon={ChevronDownIcon}
                              size="small"
                              iconPosition="right"
                              disabled
                            >
                              Price Range
                            </Pill>
                          </Flex>
                        </Flex>
                      </HorizontalOverflow>

                      <Flex gap={1}>
                        {enableImmersiveView && (
                          <Button variant={"tertiary"} size={"small"} disabled>
                            <ExpandIcon mr={0.5} />
                            Immersive
                          </Button>
                        )}

                        <Dropdown
                          dropdown={
                            <RadioGroup>
                              <Radio
                                key={1}
                                value={"-decayed_merch"}
                                label={"Recommended"}
                              />
                            </RadioGroup>
                          }
                          openDropdownByClick
                          placement="bottom-end"
                        >
                          {({ anchorRef, anchorProps }) => (
                            <Button
                              ref={anchorRef as any}
                              {...anchorProps}
                              Icon={SortIcon}
                              variant="tertiary"
                              size="small"
                              disabled
                            >
                              Sort: Recommended
                            </Button>
                          )}
                        </Dropdown>
                      </Flex>
                    </Flex>
                  </HorizontalPadding>
                </AppContainer>
              </FullBleed>
            )
          }}
        </Sticky>

        <Spacer y={2} />

        <ArtworkFilterActiveFilters />

        <Spacer y={4} />

        <SkeletonText variant="xs" flexShrink={0}>
          000 Artworks:
        </SkeletonText>

        <Spacer y={2} />

        {/* FIXME: The breakpoints that the artwork grid uses are completely different from Palette's */}
        {/* So this placeholder does not accurately reflect column count at certain widths */}
        <ArtworkGridPlaceholder columnCount={[2, 3, 4]} layout={layout} />
      </Media>
    </Skeleton>
  )
}
