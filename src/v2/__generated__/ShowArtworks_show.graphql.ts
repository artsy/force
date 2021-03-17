/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowArtworks_show = {
    readonly filtered_artworks: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
    } | null;
    readonly " $refType": "ShowArtworks_show";
};
export type ShowArtworks_show$data = ShowArtworks_show;
export type ShowArtworks_show$key = {
    readonly " $data"?: ShowArtworks_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowArtworks_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowArtworks_show",
  "selections": [
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = 'e391b4c7fa72adb269375cb89d51d672';
export default node;
