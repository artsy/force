/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"AuctionArtworkFilter_viewer">;
    readonly " $refType": "Auction2App_viewer";
};
export type Auction2App_viewer$data = Auction2App_viewer;
export type Auction2App_viewer$key = {
    readonly " $data"?: Auction2App_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "AuctionArtworkFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '5dc365ba5e98fb0562c2b5b18a3b7a24';
export default node;
