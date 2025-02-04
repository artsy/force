/**
 * @generated SignedSource<<b99a237e20dfc523331dc2ffa151353b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtsyShippingEstimate_artwork$data = {
  readonly heightCm: number | null | undefined;
  readonly isFramed: boolean | null | undefined;
  readonly listPrice: {
    readonly major?: number;
    readonly maxPrice?: {
      readonly major: number;
    } | null | undefined;
    readonly minPrice?: {
      readonly major: number;
    } | null | undefined;
  } | null | undefined;
  readonly mediumType: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly priceCurrency: string | null | undefined;
  readonly shippingCountry: string | null | undefined;
  readonly shippingOrigin: string | null | undefined;
  readonly widthCm: number | null | undefined;
  readonly " $fragmentType": "ArtsyShippingEstimate_artwork";
};
export type ArtsyShippingEstimate_artwork$key = {
  readonly " $data"?: ArtsyShippingEstimate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtsyShippingEstimate_artwork">;
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
  "name": "ArtsyShippingEstimate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFramed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingCountry",
      "storageKey": null
    },
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
              "name": "minPrice",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "maxPrice",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heightCm",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "widthCm",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "2850e23f06f3cd1c327290c9533b6458";

export default node;
