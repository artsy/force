/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesArtworkRail_artwork = {
    readonly internalID: string;
    readonly slug: string;
    readonly artistSeriesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly internalID: string;
                readonly filterArtworksConnection: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly slug: string;
                            readonly internalID: string;
                            readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistSeriesArtworkRail_artwork";
};
export type ArtistSeriesArtworkRail_artwork$data = ArtistSeriesArtworkRail_artwork;
export type ArtistSeriesArtworkRail_artwork$key = {
    readonly " $data"?: ArtistSeriesArtworkRail_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
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
  "name": "ArtistSeriesArtworkRail_artwork",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "ArtistSeriesConnection",
      "kind": "LinkedField",
      "name": "artistSeriesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistSeriesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistSeries",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v0/*: any*/),
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
                      "value": "-decayed_merch"
                    }
                  ],
                  "concreteType": "FilterArtworksConnection",
                  "kind": "LinkedField",
                  "name": "filterArtworksConnection",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "FilterArtworksEdge",
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
                            (v1/*: any*/),
                            (v0/*: any*/),
                            {
                              "args": null,
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
                  "storageKey": "filterArtworksConnection(first:20,sort:\"-decayed_merch\")"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistSeriesConnection(first:1)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'cfb241b354625af4e82f02523ff0b0a0';
export default node;
