/**
 * @generated SignedSource<<d4e3e7db700b9e0d1e683aaa7b4e1d15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsPage_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsFulfillmentInfo_order" | "Order2DetailsHeader_order" | "Order2DetailsMessage_order" | "Order2DetailsOrderSummary_order" | "Order2DetailsPaymentInfo_order" | "Order2HelpLinks_order" | "Order2PricingBreakdown_order">;
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
      "name": "Order2HelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "805c42175223056cbd4988384c19a134";

export default node;
