/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_me = {
    readonly showActiveBids: ReadonlyArray<{
        readonly activeBid: {
            readonly internalID: string;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionActiveBids_me" | "AuctionDetails_me">;
    readonly " $refType": "AuctionApp_me";
};
export type AuctionApp_me$data = AuctionApp_me;
export type AuctionApp_me$key = {
    readonly " $data"?: AuctionApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionApp_me">;
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
  "name": "AuctionApp_me",
  "selections": [
    {
      "alias": "showActiveBids",
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
(node as any).hash = 'ebe98c3104bd0df206f283da3ea1f865';
export default node;
