/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2ConfirmRegistrationRoute_sale = {
    readonly slug: string;
    readonly name: string | null;
    readonly internalID: string;
    readonly status: string | null;
    readonly requireIdentityVerification: boolean | null;
    readonly bidder: {
        readonly qualifiedForBidding: boolean | null;
    } | null;
    readonly " $refType": "Auction2ConfirmRegistrationRoute_sale";
};
export type Auction2ConfirmRegistrationRoute_sale$data = Auction2ConfirmRegistrationRoute_sale;
export type Auction2ConfirmRegistrationRoute_sale$key = {
    readonly " $data"?: Auction2ConfirmRegistrationRoute_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2ConfirmRegistrationRoute_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireIdentityVerification",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Bidder",
      "kind": "LinkedField",
      "name": "bidder",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "qualifiedForBidding",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = 'a0c20bb1e2f2ca79a416abefdca97c5c';
export default node;
