/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2BidRoute_me = {
    readonly internalID: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $refType": "Auction2BidRoute_me";
};
export type Auction2BidRoute_me$data = Auction2BidRoute_me;
export type Auction2BidRoute_me$key = {
    readonly " $data"?: Auction2BidRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2BidRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasQualifiedCreditCards",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '32ca34ff49aeab3ef45840039c8cbf48';
export default node;
