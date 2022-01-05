/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
  "argumentDefinitions": [
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
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeaturedRails_viewer",
  "selections": [
    {
      "condition": "hasCollectionRailItems",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": "collections",
          "args": [
            {
              "kind": "Variable",
              "name": "slugs",
              "variableName": "collectionRailItemIDs"
            }
          ],
          "concreteType": "MarketingCollection",
          "kind": "LinkedField",
          "name": "marketingCollections",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FeaturedCollections_collections"
            }
          ],
          "storageKey": null
        }
      ]
    },
    {
      "condition": "hasAuctionRailItems",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": "auctions",
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
          "kind": "LinkedField",
          "name": "salesConnection",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FeaturedAuctions_auctions"
            }
          ],
          "storageKey": null
        }
      ]
    },
    {
      "condition": "hasFairRailItems",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "ids",
              "variableName": "fairRailItemIDs"
            }
          ],
          "concreteType": "Fair",
          "kind": "LinkedField",
          "name": "fairs",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FeaturedFairs_fairs"
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'ba391e3daccaeda0cdcefe24f1e66c7f';
export default node;
