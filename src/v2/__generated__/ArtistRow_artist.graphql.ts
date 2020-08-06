/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRow_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly artworks: {
        readonly " $fragmentRefs": FragmentRefs<"Fillwidth_artworks">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Follow_artist">;
    readonly " $refType": "ArtistRow_artist";
};
export type ArtistRow_artist$data = ArtistRow_artist;
export type ArtistRow_artist$key = {
    readonly " $data"?: ArtistRow_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistRow_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRow_artist",
  "selections": [
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Fillwidth_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:6)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Follow_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '165cde0cf105756da9745ed008809922';
export default node;
