/**
 * @generated SignedSource<<843ebc658f9fc57c0e1fcd272a2c350e>>
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
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsAuctionResults_me">;
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "52f7c13c0f5d5b900a11b8252d44798c";

export default node;
