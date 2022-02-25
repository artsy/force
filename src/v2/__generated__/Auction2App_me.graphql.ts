/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_me = {
    readonly showLotStandingsTab: ReadonlyArray<{
        readonly activeBid: {
            readonly internalID: string;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionActiveBids_me" | "AuctionDetails_me">;
    readonly " $refType": "Auction2App_me";
};
export type Auction2App_me$data = Auction2App_me;
export type Auction2App_me$key = {
    readonly " $data"?: Auction2App_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "saleID"
};
return {
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
      "alias": "showLotStandingsTab",
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        },
        (v0/*: any*/)
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "lotStandings",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BidderPosition",
          "kind": "LinkedField",
          "name": "activeBid",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": [
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "AuctionActiveBids_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();
(node as any).hash = 'f12c6ec9b753734479fd0cdad7174ced';
export default node;
