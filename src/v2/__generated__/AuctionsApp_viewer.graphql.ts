/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_viewer = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"WorksByArtistsYouFollowRail_viewer">;
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
    }
  ],
  "type": "Viewer"
};
(node as any).hash = '54f238640d781f910ddb9f466f917efd';
export default node;
