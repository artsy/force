import { ContextModule } from "@artsy/cohesion"
import { Box, type ButtonProps, Stack } from "@artsy/palette"
import { FollowButtonInlineCount } from "Components/FollowButton/Button"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { formatFollowerCount } from "Utils/formatFollowerCount"

interface ArtistStoryFollowButtonProps {
  artistID: string
  followers?: number | null
  variant?: ButtonProps["variant"]
  width?: ButtonProps["width"]
}

export const ArtistStoryFollowButton: React.FC<
  ArtistStoryFollowButtonProps
> = ({ artistID, followers, variant, width }) => {
  return (
    <ProgressiveOnboardingFollowArtist>
      <FollowArtistButtonQueryRenderer
        id={artistID}
        contextModule={ContextModule.artistHeader}
        variant={variant}
        size="large"
        width={width}
      >
        {label => (
          <Stack gap={0.5} flexDirection="row" alignItems="center">
            <Box>{label}</Box>

            {!!followers && (
              <FollowButtonInlineCount>
                {formatFollowerCount(followers)}
              </FollowButtonInlineCount>
            )}
          </Stack>
        )}
      </FollowArtistButtonQueryRenderer>
    </ProgressiveOnboardingFollowArtist>
  )
}
