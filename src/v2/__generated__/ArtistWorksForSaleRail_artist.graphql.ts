/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleRail_artist = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly internalID: string;
    readonly slug: string;
    readonly " $refType": "ArtistWorksForSaleRail_artist";
};
export type ArtistWorksForSaleRail_artist$data = ArtistWorksForSaleRail_artist;
export type ArtistWorksForSaleRail_artist$key = {
    readonly " $data"?: ArtistWorksForSaleRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistWorksForSaleRail_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleRail_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "AVAILABILITY_ASC"
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 200
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:20,sort:\"AVAILABILITY_ASC\")"
    },
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "type": "Artist"
};
})();
(node as any).hash = '9b55c55367bdc0d1a2e6d05e14534f3f';
export default node;
