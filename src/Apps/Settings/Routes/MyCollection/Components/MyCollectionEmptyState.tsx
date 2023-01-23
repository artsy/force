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
import { ModalType } from "Components/Authentication/Types"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { resized } from "Utils/resized"

export const MyCollectionEmptyState: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

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
        <Text variant={["xl", "xl", "xxl"]}>
          Manage Your Art Collection Online
        </Text>

        <Spacer y={[0, 2]} />

        <Text variant="sm">
          Access price and market insights and build an online record of your
          collection.
        </Text>

        <Spacer y={[2, 4, 6]} />

        <GridColumns>
          <Column span={6}>
            <Button
              width="100%"
              // @ts-ignore
              as={RouterLink}
              variant="primaryBlack"
              to={
                isCollectorProfileEnabled
                  ? "/collector-profile/my-collection/artworks/new"
                  : "/my-collection/artworks/new"
              }
              onClick={event => {
                if (!isLoggedIn) {
                  event.preventDefault()

                  showAuthDialog({
                    current: {
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
                    },
                    legacy: {
                      mode: ModalType.login,
                      intent: Intent.login,
                      contextModule: ContextModule.myCollectionHome,
                      copy: "Log in to upload works to My Collection",
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
                    current: {
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
                    },
                    legacy: {
                      mode: ModalType.login,
                      intent: Intent.login,
                      contextModule: ContextModule.myCollectionHome,
                      copy: "Log in to view My Collection",
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
