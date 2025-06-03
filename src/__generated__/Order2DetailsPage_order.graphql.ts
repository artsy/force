/**
 * @generated SignedSource<<567863e883af1aa84dc87216968eeabd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly source: OrderSourceEnum;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsFulfillmentInfo_order" | "Order2DetailsHeader_order" | "Order2DetailsHelpLinks_order" | "Order2DetailsMessage_order" | "Order2DetailsOrderSummary_order" | "Order2DetailsPaymentInfo_order" | "Order2PricingBreakdown_order">;
  readonly " $fragmentType": "Order2DetailsPage_order";
};
export type Order2DetailsPage_order$key = {
  readonly " $data"?: Order2DetailsPage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsPage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsPage_order",
  "selections": [
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
      "name": "Order2DetailsHeader_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsMessage_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PricingBreakdown_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsPaymentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsFulfillmentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DetailsHelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "6d638d86c626e0d7cd25564679fd252d";

export default node;
