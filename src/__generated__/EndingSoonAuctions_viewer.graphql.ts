/**
 * @generated SignedSource<<1f1cd1dad411d80c20885d3764522b26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EndingSoonAuctions_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonAuctionsGrid_viewer">;
  readonly " $fragmentType": "EndingSoonAuctions_viewer";
};
export type EndingSoonAuctions_viewer$key = {
  readonly " $data"?: EndingSoonAuctions_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonAuctions_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeArtworksByFollowedArtists"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "isAuction"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "liveSale"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EndingSoonAuctions_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "includeArtworksByFollowedArtists",
          "variableName": "includeArtworksByFollowedArtists"
        },
        {
          "kind": "Variable",
          "name": "isAuction",
          "variableName": "isAuction"
        },
        {
          "kind": "Variable",
          "name": "liveSale",
          "variableName": "liveSale"
        }
      ],
      "kind": "FragmentSpread",
      "name": "EndingSoonAuctionsGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "bf4468b2b30e19f27affaea2ce372a46";

export default node;
