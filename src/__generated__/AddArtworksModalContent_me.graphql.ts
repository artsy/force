/**
 * @generated SignedSource<<c7f102f47ca481e66f79132fd7b30f4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddArtworksModalContent_me$data = {
  readonly collection: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
        } | null;
      } | null> | null;
      readonly totalCount: number | null;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_artworks">;
    } | null;
  } | null;
  readonly " $fragmentType": "AddArtworksModalContent_me";
};
export type AddArtworksModalContent_me$key = {
  readonly " $data"?: AddArtworksModalContent_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddArtworksModalContent_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 30,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": "POSITION_DESC",
      "kind": "LocalArgument",
      "name": "sort"
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
          "collection",
          "artworksConnection"
        ]
      }
    ]
  },
  "name": "AddArtworksModalContent_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "saved-artwork"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": [
        {
          "alias": "artworksConnection",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "sort"
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "__AddArtworksModalContent_artworksConnection_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtworksList_artworks"
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
                      "name": "internalID",
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
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "641c4bd0123ddf3098fd9ba2c2f566bc";

export default node;
