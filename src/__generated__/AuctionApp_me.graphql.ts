/**
 * @generated SignedSource<<4db4e41b96f0b73b4b971759991ff2bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_me$data = {
  readonly internalID: string;
  readonly showActiveBids: ReadonlyArray<{
    readonly activeBid: {
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionActiveBids_me" | "AuctionDetails_me">;
  readonly " $fragmentType": "AuctionApp_me";
};
export type AuctionApp_me$key = {
  readonly " $data"?: AuctionApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "saleID"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
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
    },
    (v1/*: any*/),
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
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "a977828908da87c19ce9bf21ddd97164";

export default node;
