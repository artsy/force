/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistIconicCollectionsRail_marketingCollections = ReadonlyArray<{
    readonly headerImage: string | null;
    readonly thumbnail: string | null;
    readonly slug: string;
    readonly title: string;
    readonly priceGuidance: number | null;
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly image: {
                    readonly width: number | null;
                    readonly height: number | null;
                    readonly sourceUrl: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistIconicCollectionsRail_marketingCollections";
}>;
export type ArtistIconicCollectionsRail_marketingCollections$data = ArtistIconicCollectionsRail_marketingCollections;
export type ArtistIconicCollectionsRail_marketingCollections$key = ReadonlyArray<{
    readonly " $data"?: ArtistIconicCollectionsRail_marketingCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistIconicCollectionsRail_marketingCollections">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistIconicCollectionsRail_marketingCollections",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "headerImage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnail",
      "storageKey": null
    },
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceGuidance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-decayed_merch"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
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
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "width",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "height",
                      "storageKey": null
                    },
                    {
                      "alias": "sourceUrl",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": [
                            "larger",
                            "large"
                          ]
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:[\"larger\",\"large\"])"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:1,sort:\"-decayed_merch\")"
    }
  ],
  "type": "MarketingCollection"
};
(node as any).hash = '6f0bd5de1016ec925cce3c1aea1d0716';
export default node;
