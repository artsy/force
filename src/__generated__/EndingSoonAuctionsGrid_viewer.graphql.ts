/**
 * @generated SignedSource<<85d89849aa411103a62450232404a0d5>>
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
    readonly counts: {
      readonly total: any | null;
    } | null;
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
      "name": "includeArtworksByFollowedArtists"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "isAuction"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "liveSale"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EndingSoonAuctionsGrid_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "includeArtworksByFollowedArtists",
          "variableName": "includeArtworksByFollowedArtists"
        },
        {
          "kind": "Variable",
          "name": "isAuction",
          "variableName": "isAuction"
        },
        {
          "kind": "Variable",
          "name": "liveSale",
          "variableName": "liveSale"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterSaleArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "c7a1a48ecb2cc2c7bd538f8b0ef9126e";

export default node;
