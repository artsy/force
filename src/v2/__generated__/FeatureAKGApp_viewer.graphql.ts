/**
 * @generated SignedSource<<8d7be5e2587e7268f812306e79f93b29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureAKGApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Feature_viewer">;
  readonly " $fragmentType": "FeatureAKGApp_viewer";
};
export type FeatureAKGApp_viewer$key = {
  readonly " $data"?: FeatureAKGApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureAKGApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "articleIDs"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "auctionRailItemIDs"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "collectionRailItemIDs"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "fairRailItemIDs"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasAuctionRailItems"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasCollectionRailItems"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasFairRailItems"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "selectedWorksSetID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureAKGApp_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "articleIDs",
          "variableName": "articleIDs"
        },
        {
          "kind": "Variable",
          "name": "auctionRailItemIDs",
          "variableName": "auctionRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "collectionRailItemIDs",
          "variableName": "collectionRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "fairRailItemIDs",
          "variableName": "fairRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "hasAuctionRailItems",
          "variableName": "hasAuctionRailItems"
        },
        {
          "kind": "Variable",
          "name": "hasCollectionRailItems",
          "variableName": "hasCollectionRailItems"
        },
        {
          "kind": "Variable",
          "name": "hasFairRailItems",
          "variableName": "hasFairRailItems"
        },
        {
          "kind": "Variable",
          "name": "selectedWorksSetID",
          "variableName": "selectedWorksSetID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Feature_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "7e462965607113d556dfbd202e44b165";

export default node;
