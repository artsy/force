/**
 * @generated SignedSource<<f584b3ecc55c1e05447a9983d7518732>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CascadingEndTimesBanner_viewer$data = {
  readonly cascadingBannerSaleArtworks: {
    readonly counts: {
      readonly total: any | null;
    } | null;
  } | null;
  readonly " $fragmentType": "CascadingEndTimesBanner_viewer";
};
export type CascadingEndTimesBanner_viewer$key = {
  readonly " $data"?: CascadingEndTimesBanner_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_viewer">;
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
  "name": "CascadingEndTimesBanner_viewer",
  "selections": [
    {
      "alias": "cascadingBannerSaleArtworks",
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

(node as any).hash = "b4872149a7b458c6f864f3e6bebdf490";

export default node;
