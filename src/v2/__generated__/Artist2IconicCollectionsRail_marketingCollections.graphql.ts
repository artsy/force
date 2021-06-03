/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2IconicCollectionsRail_marketingCollections = ReadonlyArray<{
    readonly headerImage: string | null;
    readonly thumbnail: string | null;
    readonly slug: string;
    readonly title: string;
    readonly priceGuidance: number | null;
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly image: {
                    readonly resized: {
                        readonly width: number | null;
                        readonly height: number | null;
                        readonly src: string;
                        readonly srcSet: string;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "Artist2IconicCollectionsRail_marketingCollections";
}>;
export type Artist2IconicCollectionsRail_marketingCollections$data = Artist2IconicCollectionsRail_marketingCollections;
export type Artist2IconicCollectionsRail_marketingCollections$key = ReadonlyArray<{
    readonly " $data"?: Artist2IconicCollectionsRail_marketingCollections$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2IconicCollectionsRail_marketingCollections">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Artist2IconicCollectionsRail_marketingCollections",
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
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 230
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 325
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
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
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "src",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "srcSet",
                          "storageKey": null
                        }
                      ],
                      "storageKey": "resized(height:230,width:325)"
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
(node as any).hash = '9fb93ca08c1648fa1f54da58caf13c46';
export default node;
