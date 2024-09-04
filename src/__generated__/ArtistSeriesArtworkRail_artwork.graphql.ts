/**
 * @generated SignedSource<<e0b130f85e38123c434f2e7702da0cfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesArtworkRail_artwork$data = {
  readonly artistSeriesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly filterArtworksConnection: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly collectorSignals: {
                readonly auction: {
                  readonly bidCount: number;
                  readonly lotWatcherCount: number;
                } | null | undefined;
                readonly partnerOffer: {
                  readonly isAvailable: boolean | null | undefined;
                } | null | undefined;
              } | null | undefined;
              readonly internalID: string;
              readonly slug: string;
              readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly slug: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentType": "ArtistSeriesArtworkRail_artwork";
};
export type ArtistSeriesArtworkRail_artwork$key = {
  readonly " $data"?: ArtistSeriesArtworkRail_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
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
                              "alias": null,
                              "args": null,
                              "concreteType": "CollectorSignals",
                              "kind": "LinkedField",
                              "name": "collectorSignals",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "PartnerOfferToCollector",
                                  "kind": "LinkedField",
                                  "name": "partnerOffer",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "isAvailable",
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "AuctionCollectorSignals",
                                  "kind": "LinkedField",
                                  "name": "auction",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "bidCount",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "lotWatcherCount",
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            },
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

(node as any).hash = "823c195eed744ac78f438c25c4feaf13";

export default node;
