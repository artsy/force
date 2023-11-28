/**
 * @generated SignedSource<<7e653773362bf21baeff99ec66f221f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketStats_priceInsightsConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly annualLotsSold: number | null | undefined;
      readonly annualValueSoldCents: any | null | undefined;
      readonly medianSaleOverEstimatePercentage: number | null | undefined;
      readonly medium: string | null | undefined;
      readonly sellThroughRate: number | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "MarketStats_priceInsightsConnection";
};
export type MarketStats_priceInsightsConnection$key = {
  readonly " $data"?: MarketStats_priceInsightsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketStats_priceInsightsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketStats_priceInsightsConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PriceInsightEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MarketPriceInsights",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "medium",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "annualLotsSold",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "annualValueSoldCents",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "sellThroughRate",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "medianSaleOverEstimatePercentage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PriceInsightConnection",
  "abstractKey": null
};

(node as any).hash = "9e1f547f87d91ca18d49af81b3c8d5d7";

export default node;
