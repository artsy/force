/**
 * @generated SignedSource<<7f14a2221df9171031f5ac894069fbae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EndingSoonAuctionsGrid_viewer$data = {
  readonly saleArtworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      } | null;
    } | null> | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null;
  readonly " $fragmentType": "EndingSoonAuctionsGrid_viewer";
};
export type EndingSoonAuctionsGrid_viewer$key = {
  readonly " $data"?: EndingSoonAuctionsGrid_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonAuctionsGrid_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
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
          "saleArtworksConnection"
        ]
      }
    ]
  },
  "name": "EndingSoonAuctionsGrid_viewer",
  "selections": [
    {
      "alias": "saleArtworksConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "isAuction",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "liveSale",
          "value": true
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "__EndingSoonAuctionsGrid_saleArtworksConnection_connection",
      "plural": false,
      "selections": [
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
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
      "storageKey": "__EndingSoonAuctionsGrid_saleArtworksConnection_connection(includeArtworksByFollowedArtists:true,isAuction:true,liveSale:true)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "7b113725246f3e007a14e32dfe78f7f3";

export default node;
