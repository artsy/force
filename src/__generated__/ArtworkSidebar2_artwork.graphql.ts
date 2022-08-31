/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_artwork = {
    readonly slug: string;
    readonly isSold: boolean | null;
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2ArtworkTitle_artwork" | "ArtworkSidebar2Artists_artwork" | "ArtworkSidebar2ShippingInformation_artwork">;
    readonly " $refType": "ArtworkSidebar2_artwork";
};
export type ArtworkSidebar2_artwork$data = ArtworkSidebar2_artwork;
export type ArtworkSidebar2_artwork$key = {
    readonly " $data"?: ArtworkSidebar2_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2_artwork",
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
      "name": "isSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2ArtworkTitle_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Artists_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2ShippingInformation_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '78ad528e0730b4a2c86bd086c10abf87';
export default node;
