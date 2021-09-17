/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_viewer = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"WorksByArtistsYouFollowRail_viewer" | "TrendingLots_viewer" | "StandoutLots_viewer">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StandoutLots_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '45cba12260871ce91aea116e78af67db';
export default node;
