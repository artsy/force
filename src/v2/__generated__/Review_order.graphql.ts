/**
 * @generated SignedSource<<5fdc2a074cf12b851db695d7c83d37b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Review_order$data = {
  readonly internalID: string;
  readonly mode: CommerceOrderModeEnum | null;
  readonly source: CommerceOrderSourceEnum;
  readonly itemsTotal: string | null;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly slug: string;
          readonly internalID: string;
          readonly artists: ReadonlyArray<{
            readonly slug: string;
          } | null> | null;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"ItemReview_lineItem">;
      } | null;
    } | null> | null;
  } | null;
  readonly conversation?: {
    readonly internalID: string | null;
  } | null;
  readonly myLastOffer?: {
    readonly hasDefiniteTotal: boolean;
    readonly internalID: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "TransactionDetailsSummaryItem_order" | "ShippingSummaryItem_order" | "CreditCardSummaryItem_order" | "ShippingArtaSummaryItem_order" | "OfferSummaryItem_order">;
  readonly " $fragmentType": "Review_order";
};
export type Review_order$key = {
  readonly " $data"?: Review_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Review_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Review_order",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "precision",
          "value": 2
        }
      ],
      "kind": "ScalarField",
      "name": "itemsTotal",
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ItemReview_lineItem"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "artists",
                      "plural": true,
                      "selections": [
                        (v1/*: any*/)
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Conversation",
          "kind": "LinkedField",
          "name": "conversation",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasDefiniteTotal",
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreditCardSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingArtaSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OfferSummaryItem_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "9f2fb427afbc623a5ba625f4b320fb41";

export default node;
