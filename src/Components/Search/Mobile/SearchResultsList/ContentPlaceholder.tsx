import { Flex, SkeletonBox, SkeletonText, Spacer } from "@artsy/palette"
import { SuggestionItemLink } from "Components/Search/SuggestionItem/SuggestionItemLink"
import { FC } from "react"

export const ContentPlaceholder: FC = () => {
  return (
    <>
      {[...Array(10)].map((_, index) => {
        return (
          <SuggestionItemLink key={index} onClick={() => {}} to="">
            <Flex alignItems="center">
              <SkeletonBox height={50} width={50} />
              <Spacer x={1} />
              <Flex flexDirection="column" flex={1} overflow="hidden">
                <SkeletonText variant="sm-display">
                  Banksy: Happy Choppers
                </SkeletonText>

                <SkeletonText variant="xs">Artist Series</SkeletonText>
              </Flex>
            </Flex>
          </SuggestionItemLink>
        )
      })}
    </>
  )
}
