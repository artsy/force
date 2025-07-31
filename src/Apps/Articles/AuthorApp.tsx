import InstagramIcon from "@artsy/icons/InstagramIcon"
import XIcon from "@artsy/icons/XIcon"
import {
  Avatar,
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"
import type { AuthorApp_author$key } from "__generated__/AuthorApp_author.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface AuthorAppProps {
  author: AuthorApp_author$key
}

export const AuthorApp: FC<React.PropsWithChildren<AuthorAppProps>> = ({
  author: _author,
}) => {
  useScrollToOpenEditorialAuthModal()

  const author = useFragment(FRAGMENT, _author)

  const [firstArticle, ...restOfArticles] = author.articles.slice(0, 5)

  return (
    <>
      <MetaTags
        title={`${author.name} | Artsy`}
        description={author.bio}
        pathname={`/articles/author/${author.id}`}
      />

      <Spacer y={[2, 4]} />

      <Stack gap={6}>
        <GridColumns gridRowGap={4} gridColumnGap={4}>
          <Column span={12}>
            <Text as="h1" variant="xl">
              Editorial
            </Text>
          </Column>

          <Column span={[6]}>
            <Stack
              gap={2}
              flexDirection="row"
              p={4}
              border="1px solid"
              borderColor="mono10"
              alignItems="center"
            >
              {author.image?.cropped && (
                <Avatar
                  size="md"
                  src={author.image.cropped.src}
                  srcSet={author.image.cropped.srcSet}
                  lazyLoad
                  initials={
                    author.initials ?? author.name.slice(0, 1).toUpperCase()
                  }
                />
              )}

              <Box>
                <Stack gap={1}>
                  <Stack gap={0.5}>
                    <Text variant="lg-display" as="h1">
                      {author.name}
                    </Text>

                    <Text variant="lg-display" as="h2" color="mono60">
                      TODO: Need to add author#role
                    </Text>
                  </Stack>

                  <Stack gap={0.5}>
                    <Stack gap={0.5} flexDirection="row" alignItems="center">
                      <XIcon />

                      <Text variant="xs" color="mono60">
                        TODO: Add X
                      </Text>
                    </Stack>

                    <Stack gap={0.5} flexDirection="row" alignItems="center">
                      <InstagramIcon />

                      <Text variant="xs" color="mono60">
                        TODO: Add Instagram
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Column>

          {author.bio && (
            <Column span={[6]}>
              <Text variant="sm-display" as="h3" fontWeight="bold">
                About {author.name}
              </Text>

              <Text variant="sm" as="p">
                {author.bio}
              </Text>
            </Column>
          )}
        </GridColumns>

        <Stack gap={4}>
          <Text variant="lg-display" as="h3">
            Articles by {author.name}
          </Text>

          <GridColumns>
            <Column span={[6]}>
              <RouterLink
                to={firstArticle.href}
                display="block"
                textDecoration="none"
                width="100%"
              >
                <Stack gap={2}>
                  <ResponsiveBox
                    aspectWidth={1}
                    aspectHeight={1}
                    maxWidth="100%"
                    bg="mono10"
                  >
                    {firstArticle.thumbnailImage?.large && (
                      <Image
                        src={firstArticle.thumbnailImage.large.src}
                        srcSet={firstArticle.thumbnailImage.large.srcSet}
                        width="100%"
                        height="100%"
                        alt=""
                        lazyLoad
                      />
                    )}
                  </ResponsiveBox>

                  <Stack gap={1}>
                    <Text variant="xs" fontWeight="bold">
                      {firstArticle.vertical}
                    </Text>

                    <Text variant="xl" lineClamp={3}>
                      {firstArticle.thumbnailTitle ?? firstArticle.title}
                    </Text>

                    <Text variant="lg-display" lineClamp={1}>
                      By {firstArticle.byline}
                    </Text>
                  </Stack>
                </Stack>
              </RouterLink>
            </Column>

            <Column span={[6]}>
              <GridColumns gridRowGap={4} gridColumnGap={2}>
                {restOfArticles.map(article => {
                  return (
                    <Column span={[12, 6]} key={article.internalID}>
                      <CellArticleFragmentContainer
                        article={article}
                        mode="GRID"
                      />
                    </Column>
                  )
                })}
              </GridColumns>
            </Column>
          </GridColumns>

          <Button alignSelf="center">Show more</Button>
        </Stack>
      </Stack>
    </>
  )
}

const FRAGMENT = graphql`
  fragment AuthorApp_author on Author {
    __typename
    id
    name
    bio
    initials
    image {
      cropped(width: 100, height: 100) {
        src
        srcSet
      }
    }
    articles {
      ...CellArticle_article
      internalID
      href
      vertical
      thumbnailTitle
      title
      byline
      publishedAt(format: "MMM D, YYYY")
      thumbnailImage {
        large: cropped(width: 600, height: 600) {
          src
          srcSet
        }
      }
    }
  }
`
