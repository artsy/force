import {
  Banner,
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

const image = resized(
  "https://files.artsy.net/images/my-coll-get-app-img.jpg",
  {
    width: 770,
    height: 652,
  }
)
interface EmptyStateProps {
  loggedOutState: boolean
}

const DesktopLayout: React.FC<EmptyStateProps> = ({ loggedOutState }) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

  return (
    <GridColumns mb={12} gridRowGap={4} alignItems="center">
      <Column span={6}>
        <Text variant="xxl">Manage Your Art Collection Online</Text>

        <Text variant="sm" mt={2} mb={6}>
          Access price and market insights and build an online record of your
          collection.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          to="/my-collection/artworks/new"
          onClick={() => (loggedOutState ? {} : trackAddCollectedArtwork())}
        >
          Upload Artwork
        </Button>
        {!!loggedOutState && (
          <Banner mt={4} variant="defaultLight">
            <Text variant="sm">
              Already have artworks in My Collection?{" "}
              <RouterLink to={null}>Log In</RouterLink> to view them.
            </Text>
          </Banner>
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

const MobileLayout: React.FC<EmptyStateProps> = ({ loggedOutState }) => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

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
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          to="/my-collection/artworks/new"
          onClick={() => (loggedOutState ? {} : trackAddCollectedArtwork())}
          width="100%"
        >
          Upload Artwork
        </Button>
        {!!loggedOutState && (
          <Banner mt={2} variant="defaultLight">
            <Text variant="sm">
              Already have artworks in My Collection?{" "}
              <RouterLink to={null}>Log In</RouterLink> to view them.
            </Text>
          </Banner>
        )}
      </Column>
    </GridColumns>
  )
}

export const MyCollectionEmptyState: React.FC<EmptyStateProps> = () => {
  return (
    <>
      <Media at="xs">
        <MobileLayout loggedOutState />
      </Media>
      <Media greaterThan="xs">
        <DesktopLayout loggedOutState />
      </Media>
    </>
  )
}
