/**
 * @generated SignedSource<<d220c37119d4afb94ac03b40cfe4261a>>
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
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_artworks">;
    } | null | undefined;
    readonly artworksCount: number;
  } | null | undefined;
  readonly " $fragmentType": "AddArtworksModalContent_me";
};
export type AddArtworksModalContent_me$key = {
  readonly " $data"?: AddArtworksModalContent_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddArtworksModalContent_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 30,
      "kind": "LocalArgument",
      "name": "first"
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
        "count": "first",
        "cursor": "after",
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "onlyVisible",
              "value": true
            }
          ],
          "kind": "ScalarField",
          "name": "artworksCount",
          "storageKey": "artworksCount(onlyVisible:true)"
        },
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

(node as any).hash = "ea2cc81f2557279171315b4210f986d7";

export default node;
