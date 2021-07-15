/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_viewer = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"WorksByArtistsYouFollowRail_viewer" | "TrendingLots_viewer">;
    readonly " $refType": "AuctionsApp_viewer";
};
export type AuctionsApp_viewer$data = AuctionsApp_viewer;
export type AuctionsApp_viewer$key = {
    readonly " $data"?: AuctionsApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyBids_me"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorksByArtistsYouFollowRail_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TrendingLots_viewer"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = '6d5a77745d353e0e3d1e8c89a7329be5';
export default node;
