/**
 * @generated SignedSource<<626752f8bd9a15d1fd696c03c5f709d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OfferHistoryItem_order$data = {
  readonly currencyCode?: string;
  readonly lastOffer?: {
    readonly amount: string | null | undefined;
    readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
    readonly internalID: string;
    readonly note: string | null | undefined;
    readonly shippingTotal: string | null | undefined;
    readonly taxTotal: string | null | undefined;
  } | null | undefined;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworkOrEditionSet: {
          readonly __typename: "Artwork";
          readonly price: string | null | undefined;
        } | {
          readonly __typename: "EditionSet";
          readonly price: string | null | undefined;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly offers?: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly amount: string | null | undefined;
        readonly createdAt: string;
        readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "OfferHistoryItem_order";
};
export type OfferHistoryItem_order$key = {
  readonly " $data"?: OfferHistoryItem_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OfferHistoryItem_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferHistoryItem_order",
  "selections": [
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
                      "selections": (v0/*: any*/),
                      "type": "Artwork",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v0/*: any*/),
                      "type": "EditionSet",
                      "abstractKey": null
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
          "concreteType": "CommerceOfferConnection",
          "kind": "LinkedField",
          "name": "offers",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceOfferEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommerceOffer",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v3/*: any*/),
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "MMM D"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "createdAt",
                      "storageKey": "createdAt(format:\"MMM D\")"
                    },
                    (v4/*: any*/)
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currencyCode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "lastOffer",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v4/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": (v2/*: any*/),
              "kind": "ScalarField",
              "name": "shippingTotal",
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "alias": null,
              "args": (v2/*: any*/),
              "kind": "ScalarField",
              "name": "taxTotal",
              "storageKey": "taxTotal(precision:2)"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "note",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "71f585f504a995973d06e8545eb5d427";

export default node;
