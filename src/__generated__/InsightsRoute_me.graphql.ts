/**
 * @generated SignedSource<<0dad67e254e3e3b1129bae32784ec611>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsRoute_me$data = {
  readonly internalID: string;
  readonly myCollectionInfo: {
    readonly artworksCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"InsightsOverview_info">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsAuctionResults_me" | "InsightsCareerHighlightRail_me" | "InsightsMedianSalePrice_me">;
  readonly " $fragmentType": "InsightsRoute_me";
};
export type InsightsRoute_me$key = {
  readonly " $data"?: InsightsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsRoute_me",
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
      "concreteType": "MyCollectionInfo",
      "kind": "LinkedField",
      "name": "myCollectionInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworksCount",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "InsightsOverview_info"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InsightsAuctionResults_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InsightsCareerHighlightRail_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InsightsMedianSalePrice_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ebd1af3514143e581cce38d10da1f709";

export default node;
