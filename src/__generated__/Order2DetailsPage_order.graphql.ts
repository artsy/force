/**
 * @generated SignedSource<<93cb73f2538eccce682f7a811ea7c275>>
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
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsFulfillmentInfo_order" | "Order2DetailsHeader_order" | "Order2DetailsMessage_order" | "Order2DetailsOrderSummary_order" | "Order2DetailsPaymentInfo_order" | "Order2DetailsPricingBreakdown_order" | "Order2HelpLinks_order">;
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
      "name": "Order2DetailsPricingBreakdown_order"
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

(node as any).hash = "025a1daeefb3507ea4e4f9c2af345f08";

export default node;
