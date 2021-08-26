/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
    readonly " $refType": "ArtistAuctionResultsRoute_artist";
};
export type ArtistAuctionResultsRoute_artist$data = ArtistAuctionResultsRoute_artist;
export type ArtistAuctionResultsRoute_artist$key = {
    readonly " $data"?: ArtistAuctionResultsRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "organizations",
      "type": "[String]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categories",
      "type": "[String]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sizes",
      "type": "[ArtworkSizes]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdAfterYear",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdBeforeYear",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates",
      "type": "Boolean"
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
  "type": "Artist"
};
(node as any).hash = '63d57d29adb2cb0ec1c44e80d4e480e9';
export default node;
