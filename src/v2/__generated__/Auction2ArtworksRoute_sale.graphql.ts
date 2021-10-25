/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2ArtworksRoute_sale = {
    readonly slug: string;
    readonly " $refType": "Auction2ArtworksRoute_sale";
};
export type Auction2ArtworksRoute_sale$data = Auction2ArtworksRoute_sale;
export type Auction2ArtworksRoute_sale$key = {
    readonly " $data"?: Auction2ArtworksRoute_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2ArtworksRoute_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2ArtworksRoute_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
(node as any).hash = '191329cffe6fc18643c4d3b8cb1f6285';
export default node;
