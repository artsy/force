/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureAKGApp_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"Feature_viewer">;
    readonly " $refType": "FeatureAKGApp_viewer";
};
export type FeatureAKGApp_viewer$data = FeatureAKGApp_viewer;
export type FeatureAKGApp_viewer$key = {
    readonly " $data"?: FeatureAKGApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureAKGApp_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureAKGApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "articleIDs",
      "type": "[String]!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "selectedWorksSetID",
      "type": "String!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "collectionRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "auctionRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "fairRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "hasCollectionRailItems",
      "type": "Boolean!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "hasAuctionRailItems",
      "type": "Boolean!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "hasFairRailItems",
      "type": "Boolean!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Feature_viewer",
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
      ]
    }
  ]
};
(node as any).hash = '7e462965607113d556dfbd202e44b165';
export default node;
