/**
 * @generated SignedSource<<3a3f646398be53d599a8821aac2f8223>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PrivateArtworkAboutArtistQuery$variables = Record<
  PropertyKey,
  never
>
export type PrivateArtworkAboutArtistQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork">
      }
    | null
    | undefined
}
export type PrivateArtworkAboutArtistQuery = {
  response: PrivateArtworkAboutArtistQuery$data
  variables: PrivateArtworkAboutArtistQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "foo",
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "slug",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "PrivateArtworkAboutArtistQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "PrivateArtworkAboutArtist_artwork",
            },
          ],
          storageKey: 'artwork(id:"foo")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "PrivateArtworkAboutArtistQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "displayArtistBio",
              storageKey: null,
            },
            v1 /*: any*/,
            {
              alias: null,
              args: [
                {
                  kind: "Literal",
                  name: "shallow",
                  value: true,
                },
              ],
              concreteType: "Artist",
              kind: "LinkedField",
              name: "artists",
              plural: true,
              selections: [
                v2 /*: any*/,
                v1 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "name",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "internalID",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "ArtistCounts",
                  kind: "LinkedField",
                  name: "counts",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "follows",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "href",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "initials",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "formattedNationalityAndBirthday",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "Artwork",
                  kind: "LinkedField",
                  name: "coverArtwork",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "Image",
                      kind: "LinkedField",
                      name: "image",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: [
                            {
                              kind: "Literal",
                              name: "height",
                              value: 145,
                            },
                            {
                              kind: "Literal",
                              name: "width",
                              value: 145,
                            },
                          ],
                          concreteType: "CroppedImageUrl",
                          kind: "LinkedField",
                          name: "cropped",
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "src",
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              kind: "ScalarField",
                              name: "srcSet",
                              storageKey: null,
                            },
                          ],
                          storageKey: "cropped(height:145,width:145)",
                        },
                      ],
                      storageKey: null,
                    },
                    v2 /*: any*/,
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: [
                    {
                      kind: "Literal",
                      name: "format",
                      value: "HTML",
                    },
                    {
                      kind: "Literal",
                      name: "partnerBio",
                      value: false,
                    },
                  ],
                  concreteType: "ArtistBlurb",
                  kind: "LinkedField",
                  name: "biographyBlurb",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "text",
                      storageKey: null,
                    },
                  ],
                  storageKey: 'biographyBlurb(format:"HTML",partnerBio:false)',
                },
              ],
              storageKey: "artists(shallow:true)",
            },
            v2 /*: any*/,
          ],
          storageKey: 'artwork(id:"foo")',
        },
      ],
    },
    params: {
      cacheID: "2df16e7212187df1d4703db69b256451",
      id: null,
      metadata: {},
      name: "PrivateArtworkAboutArtistQuery",
      operationKind: "query",
      text: 'query PrivateArtworkAboutArtistQuery {\n  artwork(id: "foo") {\n    ...PrivateArtworkAboutArtist_artwork\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  slug\n  name\n  internalID\n  counts {\n    follows\n  }\n}\n\nfragment PrivateArtworkAboutArtist_artwork on Artwork {\n  displayArtistBio\n  slug\n  artists(shallow: true) {\n    ...FollowArtistButton_artist\n    internalID\n    href\n    slug\n    name\n    initials\n    formattedNationalityAndBirthday\n    counts {\n      follows\n    }\n    coverArtwork {\n      image {\n        cropped(width: 145, height: 145) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    biographyBlurb(format: HTML, partnerBio: false) {\n      text\n    }\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "a225563bf8ce2240737c7e481a70c7d9"

export default node
