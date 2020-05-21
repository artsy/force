/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtistRow_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "artworks",
      "name": "artworksConnection",
      "storageKey": "artworksConnection(first:6)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Fillwidth_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Follow_artist",
      "args": null
    }
  ]
};
(node as any).hash = '165cde0cf105756da9745ed008809922';
export default node;
