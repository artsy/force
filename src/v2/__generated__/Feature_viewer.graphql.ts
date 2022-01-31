/**
 * @generated SignedSource<<86e29b5f7f03484321cfc9492e5be0c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Feature_viewer$data = {
  readonly articles: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"FeaturedArticles_articles">;
  } | null> | null;
  readonly selectedWorks: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectedWorks_selectedWorks">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedRails_viewer">;
  readonly " $fragmentType": "Feature_viewer";
};
export type Feature_viewer$key = {
  readonly " $data"?: Feature_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Feature_viewer">;
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
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "308da696148367711e40c557c82521e0";

export default node;
