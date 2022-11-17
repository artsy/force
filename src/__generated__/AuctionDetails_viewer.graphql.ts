/**
 * @generated SignedSource<<f77bd2ff7cc0652519174bb48a8fcd6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_viewer$data = {
  readonly auctionDetailsSaleArtworks: {
    readonly counts: {
      readonly total: any | null;
    } | null;
  } | null;
  readonly " $fragmentType": "AuctionDetails_viewer";
};
export type AuctionDetails_viewer$key = {
  readonly " $data"?: AuctionDetails_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionDetails_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetails_viewer",
  "selections": [
    {
      "alias": "auctionDetailsSaleArtworks",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Variable",
          "name": "saleSlug",
          "variableName": "saleID"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "81d6f6fa7e7db34982fef89110106044";

export default node;
