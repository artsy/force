import InstagramIcon from "@artsy/icons/InstagramIcon"
import XIcon from "@artsy/icons/XIcon"
import {
  Avatar,
  Box,
  Column,
  GridColumns,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ClientSuspense } from "Components/ClientSuspense"
import { MetaTags } from "Components/MetaTags"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"
import type { AuthorApp_author$key } from "__generated__/AuthorApp_author.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import {
  AuthorArticlesGrid,
  AuthorArticlesGridPlaceholder,
} from "./Components/AuthorArticlesGrid"

interface AuthorAppProps {
  author: AuthorApp_author$key
}

export const AuthorApp: FC<React.PropsWithChildren<AuthorAppProps>> = ({
  author: _author,
}) => {
  useScrollToOpenEditorialAuthModal()

  const author = useFragment(FRAGMENT, _author)

  return (
    <>
      <MetaTags
        title={`${author.name} | Artsy`}
        description={author.bio}
        pathname={`/articles/author/${author.internalID}`}
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

                    {author.role && (
                      <Text variant="lg-display" as="h2" color="mono60">
                        {author.role}
                      </Text>
                    )}
                  </Stack>

                  {author.socials && (
                    <Stack gap={0.5}>
                      {author.socials.x && (
                        <AuthorSocialLink
                          as="a"
                          href={author.socials.x.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <XIcon />

                          <Text variant="xs">{author.socials.x.handle}</Text>
                        </AuthorSocialLink>
                      )}

                      {author.socials.instagram && (
                        <AuthorSocialLink
                          as="a"
                          href={author.socials.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InstagramIcon />

                          <Text variant="xs">
                            {author.socials.instagram.handle}
                          </Text>
                        </AuthorSocialLink>
                      )}
                    </Stack>
                  )}
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

          <ClientSuspense fallback={<AuthorArticlesGridPlaceholder />}>
            <AuthorArticlesGrid id={author.internalID} />
          </ClientSuspense>
        </Stack>
      </Stack>
    </>
  )
}

const FRAGMENT = graphql`
  fragment AuthorApp_author on Author {
    __typename
    internalID
    name
    bio
    initials
    role
    socials {
      x {
        handle
        url
      }
      instagram {
        handle
        url
      }
    }
    image {
      cropped(width: 100, height: 100) {
        src
        srcSet
      }
    }
  }
`

const AuthorSocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${themeGet("space.half")};
  text-decoration: none;
  color: ${themeGet("colors.mono60")};

  svg {
    color: ${themeGet("colors.mono100")};
  }

  &:hover {
    color: ${themeGet("colors.mono100")};
  }
`
