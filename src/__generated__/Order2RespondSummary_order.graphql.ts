/**
 * @generated SignedSource<<3de546186af39599524a932e94f8fed5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondSummary_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly attributionClass: {
        readonly shortDescription: string | null | undefined;
      } | null | undefined;
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly framedDimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly images: ReadonlyArray<{
        readonly resized: {
          readonly url: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly internalID: string;
      readonly price: string | null | undefined;
    } | null | undefined;
    readonly artworkVersion: {
      readonly artistNames: string | null | undefined;
      readonly date: string | null | undefined;
      readonly image: {
        readonly resized: {
          readonly url: string;
        } | null | undefined;
      } | null | undefined;
      readonly title: string | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2RespondSummary_order";
};
export type Order2RespondSummary_order$key = {
  readonly " $data"?: Order2RespondSummary_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondSummary_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 200
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
        "name": "url",
        "storageKey": null
      }
    ],
    "storageKey": "resized(height:200)"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "in",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cm",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondSummary_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutPricingBreakdown_order"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkVersion",
          "kind": "LinkedField",
          "name": "artworkVersion",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "artistNames",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "date",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
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
              "name": "price",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AttributionClass",
              "kind": "LinkedField",
              "name": "attributionClass",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortDescription",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "dimensions",
              "kind": "LinkedField",
              "name": "dimensions",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "dimensions",
              "kind": "LinkedField",
              "name": "framedDimensions",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "includeAll",
                  "value": false
                }
              ],
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "images",
              "plural": true,
              "selections": (v0/*: any*/),
              "storageKey": "images(includeAll:false)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "6d5cdee50cb71c8de38b5d22707c6d80";

export default node;
