/**
 * @generated SignedSource<<20e09ec1e749c994296cd341f36e1732>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
  readonly " $fragmentType": "ArtistAuctionResultsRoute_artist";
};
export type ArtistAuctionResultsRoute_artist$key = {
  readonly " $data"?: ArtistAuctionResultsRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categories"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdAfterYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdBeforeYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "organizations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sizes"
    },
    {
      "defaultValue": "ALL",
      "kind": "LocalArgument",
      "name": "state"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResultsRoute_artist",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "allowEmptyCreatedDates",
          "variableName": "allowEmptyCreatedDates"
        },
        {
          "kind": "Variable",
          "name": "categories",
          "variableName": "categories"
        },
        {
          "kind": "Variable",
          "name": "createdAfterYear",
          "variableName": "createdAfterYear"
        },
        {
          "kind": "Variable",
          "name": "createdBeforeYear",
          "variableName": "createdBeforeYear"
        },
        {
          "kind": "Variable",
          "name": "organizations",
          "variableName": "organizations"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "sizes",
          "variableName": "sizes"
        },
        {
          "kind": "Variable",
          "name": "state",
          "variableName": "state"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistAuctionResults_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "77415e9b7ab12bb7008786080c206b2a";

export default node;
