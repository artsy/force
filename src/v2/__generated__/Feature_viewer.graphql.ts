/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Feature_viewer = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FeaturedArticles_articles">;
    } | null> | null;
    readonly selectedWorks: {
        readonly " $fragmentRefs": FragmentRefs<"SelectedWorks_selectedWorks">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedRails_viewer">;
    readonly " $refType": "Feature_viewer";
};
export type Feature_viewer$data = Feature_viewer;
export type Feature_viewer$key = {
    readonly " $data"?: Feature_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Feature_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "articleIDs",
      "type": "[String]!"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "selectedWorksSetID",
      "type": "String!"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "collectionRailItemIDs",
      "type": "[String!]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "auctionRailItemIDs",
      "type": "[String!]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "fairRailItemIDs",
      "type": "[String!]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasCollectionRailItems",
      "type": "Boolean!"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasAuctionRailItems",
      "type": "Boolean!"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasFairRailItems",
      "type": "Boolean!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Feature_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "ids",
          "variableName": "articleIDs"
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "articles",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FeaturedArticles_articles"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "selectedWorks",
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "selectedWorksSetID"
        }
      ],
      "concreteType": "OrderedSet",
      "kind": "LinkedField",
      "name": "orderedSet",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SelectedWorks_selectedWorks"
        }
      ],
      "storageKey": null
    },
    {
      "args": [
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
        }
      ],
      "kind": "FragmentSpread",
      "name": "FeaturedRails_viewer"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = '308da696148367711e40c557c82521e0';
export default node;
