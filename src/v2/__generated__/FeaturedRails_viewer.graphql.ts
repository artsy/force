/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedRails_viewer = {
    readonly collections?: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FeaturedCollections_collections">;
    } | null> | null;
    readonly auctions?: {
        readonly " $fragmentRefs": FragmentRefs<"FeaturedAuctions_auctions">;
    } | null;
    readonly fairs?: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FeaturedFairs_fairs">;
    } | null> | null;
    readonly " $refType": "FeaturedRails_viewer";
};
export type FeaturedRails_viewer$data = FeaturedRails_viewer;
export type FeaturedRails_viewer$key = {
    readonly " $data"?: FeaturedRails_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedRails_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeaturedRails_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
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
      "kind": "Condition",
      "passingValue": true,
      "condition": "hasCollectionRailItems",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "collections",
          "name": "marketingCollections",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "slugs",
              "variableName": "collectionRailItemIDs"
            }
          ],
          "concreteType": "MarketingCollection",
          "plural": true,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "FeaturedCollections_collections",
              "args": null
            }
          ]
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "hasAuctionRailItems",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "auctions",
          "name": "salesConnection",
          "storageKey": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 50
            },
            {
              "kind": "Variable",
              "name": "ids",
              "variableName": "auctionRailItemIDs"
            }
          ],
          "concreteType": "SaleConnection",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "FeaturedAuctions_auctions",
              "args": null
            }
          ]
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "hasFairRailItems",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "fairs",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "ids",
              "variableName": "fairRailItemIDs"
            }
          ],
          "concreteType": "Fair",
          "plural": true,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "FeaturedFairs_fairs",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'ba391e3daccaeda0cdcefe24f1e66c7f';
export default node;
