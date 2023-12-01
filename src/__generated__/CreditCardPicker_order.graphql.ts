/**
 * @generated SignedSource<<77c9a4740f33c5949715cf5d263b2ca2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CreditCardPicker_order$data = {
  readonly creditCard: {
    readonly brand: string;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly expirationMonth: number;
    readonly expirationYear: number;
    readonly internalID: string;
    readonly lastDigits: string;
    readonly name: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly state: string | null | undefined;
    readonly street1: string | null | undefined;
    readonly street2: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly slug: string;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly mode: CommerceOrderModeEnum | null | undefined;
  readonly requestedFulfillment: {
    readonly __typename: "CommercePickup";
    readonly fulfillmentType: string;
  } | {
    readonly __typename: "CommerceShip";
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | {
    readonly __typename: "CommerceShipArta";
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly state: CommerceOrderStateEnum;
  readonly " $fragmentType": "CreditCardPicker_order";
};
export type CreditCardPicker_order$key = {
  readonly " $data"?: CreditCardPicker_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_order">;
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
  "name": "state",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  (v4/*: any*/),
  (v5/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreditCardPicker_order",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CreditCard",
      "kind": "LinkedField",
      "name": "creditCard",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "street1",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "street2",
          "storageKey": null
        },
        (v3/*: any*/),
        (v1/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expirationMonth",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expirationYear",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastDigits",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "brand",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "requestedFulfillment",
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
          "selections": (v6/*: any*/),
          "type": "CommerceShip",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v6/*: any*/),
          "type": "CommerceShipArta",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "fulfillmentType",
              "storageKey": null
            }
          ],
          "type": "CommercePickup",
          "abstractKey": null
        }
      ],
      "storageKey": null
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
                      "name": "slug",
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "458cdcd3fcb5c7f8aa87d89b0a7913df";

export default node;
