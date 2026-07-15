/**
 * @generated SignedSource<<6141f6e287e186e0c4ad2a30c968948e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondSummary_order$data = {
  readonly internalID: string;
  readonly lastSubmittedOffer: {
    readonly createdAt: string | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly images: ReadonlyArray<{
        readonly resized: {
          readonly url: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly internalID: string;
    } | null | undefined;
    readonly artworkOrEditionSet: {
      readonly __typename: "Artwork";
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly framedDimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly price: string | null | undefined;
    } | {
      readonly __typename: "EditionSet";
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly framedDimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly price: string | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly artworkVersion: {
      readonly artistNames: string | null | undefined;
      readonly attributionClass: {
        readonly shortDescription: string | null | undefined;
      } | null | undefined;
      readonly date: string | null | undefined;
      readonly image: {
        readonly resized: {
          readonly url: string;
        } | null | undefined;
      } | null | undefined;
      readonly title: string | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly pendingOffer: {
    readonly createdAt: string | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OrderSummary_order">;
  readonly " $fragmentType": "Order2RespondSummary_order";
};
export type Order2RespondSummary_order$key = {
  readonly " $data"?: Order2RespondSummary_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondSummary_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createdAt",
    "storageKey": null
  }
],
v2 = [
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
],
v3 = [
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
    "concreteType": "dimensions",
    "kind": "LinkedField",
    "name": "dimensions",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "dimensions",
    "kind": "LinkedField",
    "name": "framedDimensions",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  }
],
v4 = [
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
      "name": "Order2OrderSummary_order"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "artworkOrEditionSet",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "Artwork",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "EditionSet",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
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
              "name": "title",
              "storageKey": null
            },
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
              "name": "date",
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
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": (v4/*: any*/),
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
            (v0/*: any*/),
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
              "selections": (v4/*: any*/),
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

(node as any).hash = "434c9f3df03b9328c9a72ece5b2ddccf";

export default node;
