import { ORGANIZATION_STUB_SCHEMA } from "Apps/About/Components/AboutStructuredData"
import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import { getAuthorUrl } from "Utils/getAuthorUrl"
import type { AuthorStructuredData_author$key } from "__generated__/AuthorStructuredData_author.graphql"
import { compact } from "lodash"
import { graphql } from "react-relay"
import { useFragment } from "react-relay"

interface AuthorStructuredDataProps {
  author: AuthorStructuredData_author$key
}

export const AuthorStructuredData: React.FC<
  React.PropsWithChildren<AuthorStructuredDataProps>
> = props => {
  const author = useFragment(AUTHOR_STRUCTURD_DATA_FRAGMENT, props.author)
  const url = `${getENV("APP_URL")}${getAuthorUrl({ slug: author.slug, name: author.name, internalID: author.internalID })}`

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url: url,
        name: `${author.name}${author.role ? ` - ${author.role}` : ""}`,
        description: author.description ?? undefined,
        mainEntity: {
          "@type": "Person",
          "@id": `${url}#person`,
          name: author.name,
          jobTitle: author.role ?? undefined,
          description: author.description ?? undefined,
          url: url,
          sameAs: compact([
            author.socials?.x?.url,
            author.socials?.instagram?.url,
          ]),
          affiliation: ORGANIZATION_STUB_SCHEMA,
        },
        publisher: ORGANIZATION_STUB_SCHEMA,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.artsy.net/#website",
          name: "Artsy",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.artsy.net",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Authors",
              item: "https://www.artsy.net/articles/authors",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: author.name,
              item: url,
            },
          ],
        },
      }}
    />
  )
}

const AUTHOR_STRUCTURD_DATA_FRAGMENT = graphql`
  fragment AuthorStructuredData_author on Author {
    name
    role
    internalID
    slug
    description: bio(format: PLAIN)
    socials {
      x {
        url
      }
      instagram {
        url
      }
    }
  }
`
