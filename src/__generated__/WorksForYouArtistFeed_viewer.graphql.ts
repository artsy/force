/**
 * @generated SignedSource<<a9d1fb9e4f80f1893f9490793acf1222>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouArtistFeed_viewer$data = {
  readonly artist: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean;
      };
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
    } | null | undefined;
    readonly counts: {
      readonly artworks: any | null | undefined;
      readonly forSaleArtworks: any | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "WorksForYouArtistFeed_viewer";
};
export type WorksForYouArtistFeed_viewer$key = {
  readonly " $data"?: WorksForYouArtistFeed_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouArtistFeed_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "artistSlug"
    },
    {
      "defaultValue": 25,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": [
        "IS_FOR_SALE"
      ],
      "kind": "LocalArgument",
      "name": "filter"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "artist",
          "artworksConnection"
        ]
      }
    ]
  },
  "name": "WorksForYouArtistFeed_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artistSlug"
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "artworks",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "forSaleArtworks",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "src",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:80,width:80)"
            }
          ],
          "storageKey": null
        },
        {
          "alias": "artworksConnection",
          "args": [
            {
              "kind": "Variable",
              "name": "filter",
              "variableName": "filter"
            },
            {
              "kind": "Literal",
              "name": "sort",
              "value": "PUBLISHED_AT_DESC"
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "__WorksForYouArtistFeed_artworksConnection_connection",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "a86b452e78e54f9c19a3008ae780ae74";

export default node;
