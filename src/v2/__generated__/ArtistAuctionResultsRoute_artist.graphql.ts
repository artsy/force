/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
    readonly " $refType": "ArtistAuctionResultsRoute_artist";
};
export type ArtistAuctionResultsRoute_artist$data = ArtistAuctionResultsRoute_artist;
export type ArtistAuctionResultsRoute_artist$key = {
    readonly " $data"?: ArtistAuctionResultsRoute_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
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
      "name": "sizes"
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
          "name": "sizes",
          "variableName": "sizes"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistAuctionResults_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '63d57d29adb2cb0ec1c44e80d4e480e9';
export default node;
