/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistList_artists = ReadonlyArray<{
    readonly representedBy: boolean | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"PartnerArtistItem_artist">;
    } | null;
    readonly " $refType": "PartnerArtistList_artists";
}>;
export type PartnerArtistList_artists$data = PartnerArtistList_artists;
export type PartnerArtistList_artists$key = ReadonlyArray<{
    readonly " $data"?: PartnerArtistList_artists$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistList_artists">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PartnerArtistList_artists",
  "selections": [
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
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PartnerArtistItem_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge",
  "abstractKey": null
};
(node as any).hash = '43f62dc2e715435fc8ebc6d90b287413';
export default node;
