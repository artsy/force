/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRail_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly slug: string;
                    readonly href: string | null;
                    readonly " $fragmentRefs": FragmentRefs<"CellArtist_artist">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistRelatedArtistsRail_artist";
};
export type ArtistRelatedArtistsRail_artist$data = ArtistRelatedArtistsRail_artist;
export type ArtistRelatedArtistsRail_artist$key = {
    readonly " $data"?: ArtistRelatedArtistsRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedArtistsRail_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
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
              "name": "kind",
              "value": "MAIN"
            }
          ],
          "concreteType": "ArtistConnection",
          "kind": "LinkedField",
          "name": "artistsConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
                    (v0/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "CellArtist_artist"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:20,kind:\"MAIN\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = '4a6a762d769be3f2f6465e7c12e16269';
export default node;
