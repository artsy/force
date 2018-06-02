/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtistRoute_artist = {
    readonly id: string;
    readonly name: string | null;
    readonly bio: string | null;
    readonly artworks: ReadonlyArray<({
    }) | null> | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistRoute_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
      "name": "bio",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistArtworks_artworks",
          "args": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '8c00fdbce15e3bf36d5925a7b37ef0e7';
export default node;
