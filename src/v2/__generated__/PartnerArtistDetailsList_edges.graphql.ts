/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetailsList_edges = ReadonlyArray<{
    readonly isDisplayOnPartnerProfile: boolean | null;
    readonly representedBy: boolean | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly node: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetails_artist">;
    } | null;
    readonly " $refType": "PartnerArtistDetailsList_edges";
}>;
export type PartnerArtistDetailsList_edges$data = PartnerArtistDetailsList_edges;
export type PartnerArtistDetailsList_edges$key = ReadonlyArray<{
    readonly " $data"?: PartnerArtistDetailsList_edges$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetailsList_edges">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PartnerArtistDetailsList_edges",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDisplayOnPartnerProfile",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "representedBy",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PartnerArtistDetails_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge"
};
(node as any).hash = '4685f39593c0d0b54a8f8d844ad0cf37';
export default node;
