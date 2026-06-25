/**
 * @generated SignedSource<<b39854b5bc45f37899a56cbcc7395d52>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2RespondApp_order$data = {
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order" | "Order2RespondDeliveryAddress_order" | "Order2RespondForm_order" | "Order2RespondPaymentMethod_order" | "Order2RespondShippingMethod_order" | "Order2RespondSummary_order">;
  readonly " $fragmentType": "Order2RespondApp_order";
};
export type Order2RespondApp_order$key = {
  readonly " $data"?: Order2RespondApp_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondApp_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondApp_order",
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
      "name": "mode",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondDeliveryAddress_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondShippingMethod_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondPaymentMethod_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2HelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "daa27e19ca1033b707181407c5c5ea04";

export default node;
