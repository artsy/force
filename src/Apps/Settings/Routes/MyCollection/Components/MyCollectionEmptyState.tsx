import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Button,
  Clickable,
  Column,
  GridColumns,
  Image,
  Message,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { EmptyMyCollectionPageProps } from "Apps/Settings/Routes/MyCollection/Components/EmptyMyCollectionPage"
import { ModalType } from "Components/Authentication/Types"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { openAuthModal } from "Utils/openAuthModal"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

const DesktopLayout: React.FC<EmptyMyCollectionPageProps> = ({
  loggedOutState,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const { mediator } = useSystemContext()
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  const image = resized(
    "https://files.artsy.net/images/my-coll-get-app-img.jpg",
    {
      width: 770,
      height: 652,
    }
  )

  return (
    <GridColumns mb={12} gridRowGap={4} alignItems="center">
      <Column span={6}>
        <Text variant="xxl">Manage Your Art Collection Online</Text>

        <Text variant="sm" mt={2} mb={6}>
          Access price and market insights and build an online record of your
          collection.
        </Text>
        {!!loggedOutState ? (
          <Button
            variant="primaryBlack"
            onClick={() => {
              mediator &&
                openAuthModal(mediator, {
                  mode: ModalType.login,
                  intent: Intent.login,
                  contextModule: ContextModule.myCollectionHome,
                  copy: "Log in to upload works to My Collection",
                })
              trackAddCollectedArtwork()
            }}
          >
            Upload Artwork
          </Button>
        ) : (
          <Button
            // @ts-ignore
            as={RouterLink}
            variant="primaryBlack"
            to={
              isCollectorProfileEnabled
                ? "/collector-profile/my-collection/artworks/new"
                : "/my-collection/artworks/new"
            }
            onClick={() => trackAddCollectedArtwork()}
          >
            Upload Artwork
          </Button>
        )}
        {!!loggedOutState && (
          <Message mt={4} variant="info">
            <Text variant="sm">
              Already have artworks in My Collection?{" "}
              <Clickable
                textDecoration="underline"
                onClick={() => {
                  mediator &&
                    openAuthModal(mediator, {
                      mode: ModalType.login,
                      intent: Intent.login,
                      contextModule: ContextModule.myCollectionHome,
                      copy: "Log in to view My Collection",
                    })
                }}
              >
                Log In
              </Clickable>{" "}
              to view them.
            </Text>
          </Message>
        )}
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={770} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="Screenshot of My Collection sample screen on the App against a painting background"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}

const MobileLayout: React.FC<EmptyMyCollectionPageProps> = ({
  loggedOutState,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const { mediator } = useSystemContext()
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  const image = resized(
    "https://files.artsy.net/images/my-coll-get-app-img.jpg",
    {
      width: 770,
      height: 652,
    }
  )

  return (
    <GridColumns gridRowGap={2} alignItems="center">
      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={770} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="My Collection app hero image"
          />
        </ResponsiveBox>
      </Column>

      <Column span={6}>
        <Text variant="xl" mt={2}>
          Manage Your Art Collection Online
        </Text>

        <Text variant="sm" mt={0.5} mb={2}>
          Access price and market insights and build an online record of your
          collection.
        </Text>
        {!!loggedOutState ? (
          <Button
            variant="primaryBlack"
            onClick={() => {
              mediator &&
                openAuthModal(mediator, {
                  mode: ModalType.login,
                  intent: Intent.login,
                  contextModule: ContextModule.myCollectionHome,
                  copy: "Log in to upload works to My Collection",
                })
              trackAddCollectedArtwork()
            }}
            width="100%"
          >
            Upload Artwork
          </Button>
        ) : (
          <Button
            // @ts-ignore
            as={RouterLink}
            variant="primaryBlack"
            to={
              isCollectorProfileEnabled
                ? "/collector-profile/my-collection/artworks/new"
                : "/my-collection/artworks/new"
            }
            onClick={() => trackAddCollectedArtwork()}
            width="100%"
          >
            Upload Artwork
          </Button>
        )}

        {!!loggedOutState && (
          <Message mt={2} variant="info">
            <Text variant="sm">
              Already have artworks in My Collection?{" "}
              <Clickable
                textDecoration="underline"
                onClick={() => {
                  mediator &&
                    openAuthModal(mediator, {
                      mode: ModalType.login,
                      intent: Intent.login,
                      contextModule: ContextModule.myCollectionHome,
                      copy: "Log in to view My Collection",
                    })
                }}
              >
                Log In
              </Clickable>{" "}
              to view them.
            </Text>
          </Message>
        )}
      </Column>
    </GridColumns>
  )
}

export const MyCollectionEmptyState: React.FC<EmptyMyCollectionPageProps> = ({
  loggedOutState,
}) => {
  return (
    <>
      <Media at="xs">
        <MobileLayout loggedOutState={loggedOutState} />
      </Media>
      <Media greaterThan="xs">
        <DesktopLayout loggedOutState={loggedOutState} />
      </Media>
    </>
  )
}
