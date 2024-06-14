import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Button,
  Clickable,
  Column,
  GridColumns,
  Image,
  Message,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { resized } from "Utils/resized"

export const MyCollectionEmptyState: React.FC = () => {
  const { isLoggedIn } = useSystemContext()

  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  const image = resized(
    "https://files.artsy.net/images/my-coll-get-app-img.jpg",
    { width: 910, height: 770 } // TODO: Source image should be 4:3, ideally. Is currently 709:600
  )

  const { showAuthDialog } = useAuthDialog()

  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={6} order={[1, 0]} py={[0, 2]}>
        <Text variant={["xl", "xl", "xxl"]}>Know Your Collection Better</Text>

        <Spacer y={[0, 2]} />

        <Text variant="sm">
          Manage your collection online and get free market insights.
        </Text>

        <Spacer y={[2, 4, 6]} />

        <GridColumns>
          <Column span={6}>
            <Button
              width="100%"
              // @ts-ignore
              as={RouterLink}
              variant="primaryBlack"
              to={"/collector-profile/my-collection/artworks/new"}
              onClick={event => {
                if (!isLoggedIn) {
                  event.preventDefault()

                  showAuthDialog({
                    mode: "Login",
                    options: {
                      title: mode => {
                        const action = mode === "Login" ? "Log in" : "Sign up"
                        return `${action} to upload works to My Collection`
                      },
                    },
                    analytics: {
                      contextModule: ContextModule.myCollectionHome,
                      intent: Intent.login,
                    },
                  })

                  return
                }

                trackAddCollectedArtwork()
              }}
            >
              Upload Artwork
            </Button>
          </Column>
        </GridColumns>

        {!isLoggedIn && (
          <>
            <Spacer y={[2, 4]} />

            <Message variant="info">
              Already have artworks in My Collection?{" "}
              <Clickable
                textDecoration="underline"
                onClick={() => {
                  showAuthDialog({
                    mode: "Login",
                    options: {
                      title: mode => {
                        const action = mode === "Login" ? "Log in" : "Sign up"
                        return `${action} to view My Collection`
                      },
                    },
                    analytics: {
                      contextModule: ContextModule.myCollectionHome,
                      intent: Intent.login,
                    },
                  })
                }}
              >
                Log In
              </Clickable>{" "}
              to view them.
            </Message>
          </>
        )}
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectWidth={910} aspectHeight={770} maxWidth="100%">
          <Image
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            lazyLoad
            alt="Screenshot of My Collection sample screen on the App against a painting background"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}
