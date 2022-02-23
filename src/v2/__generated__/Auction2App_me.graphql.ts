/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_me = {
    readonly " $fragmentRefs": FragmentRefs<"AuctionDetails_me" | "AuctionActiveBids_me">;
    readonly " $refType": "Auction2App_me";
};
export type Auction2App_me$data = Auction2App_me;
export type Auction2App_me$key = {
    readonly " $data"?: Auction2App_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_me"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "saleID",
          "variableName": "saleID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "AuctionActiveBids_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'f2d9dfc5d379da5b57da940144ee5681';
export default node;
