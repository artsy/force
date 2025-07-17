/**
 * @generated SignedSource<<69fdaed6130599ad961cc3d55cede0e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsPage_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order" | "OrderDetailsFulfillmentInfo_order" | "OrderDetailsHeader_order" | "OrderDetailsMessage_order" | "OrderDetailsOrderSummary_order" | "OrderDetailsPaymentInfo_order" | "OrderDetailsPricingBreakdown_order">;
  readonly " $fragmentType": "OrderDetailsPage_order";
};
export type OrderDetailsPage_order$key = {
  readonly " $data"?: OrderDetailsPage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsPage_order",
  "selections": [
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
      "name": "OrderDetailsHeader_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsMessage_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsOrderSummary_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsPricingBreakdown_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsPaymentInfo_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsFulfillmentInfo_order"
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

(node as any).hash = "d7d2d748011a620af04b554bd3b88ebd";

export default node;
