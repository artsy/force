/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionArtworksRail_sale = {
    readonly internalID: string;
    readonly slug: string;
    readonly href: string | null;
    readonly name: string | null;
    readonly formattedStartDateTime: string | null;
    readonly isLiveOpen: boolean | null;
    readonly status: string | null;
    readonly isPreliminary: boolean | null;
    readonly " $refType": "AuctionArtworksRail_sale";
};
export type AuctionArtworksRail_sale$data = AuctionArtworksRail_sale;
export type AuctionArtworksRail_sale$key = {
    readonly " $data"?: AuctionArtworksRail_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionArtworksRail_sale",
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
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
      "name": "formattedStartDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLiveOpen",
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
      "name": "isPreliminary",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
(node as any).hash = '8b0d3f928e933ba9dbbc6d6a903c7168';
export default node;
