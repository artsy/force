/**
 * @generated SignedSource<<4f4367de8799274cb85a9a2d4064db01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_artwork$data = {
  readonly isPriceRange: boolean | null | undefined;
  readonly listPrice: {
    readonly major?: number;
    readonly maxPrice?: {
      readonly major: number;
    } | null | undefined;
    readonly minPrice?: {
      readonly major: number;
    } | null | undefined;
  } | null | undefined;
  readonly priceCurrency: string | null | undefined;
  readonly " $fragmentType": "PriceOptions_artwork";
};
export type PriceOptions_artwork$key = {
  readonly " $data"?: PriceOptions_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceOptions_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceOptions_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceCurrency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPriceRange",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "listPrice",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "Money",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "maxPrice",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "minPrice",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "type": "PriceRange",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "e2c55f754102f8e520054da7374d459f";

export default node;
